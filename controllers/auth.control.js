import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/genarateToken.js";

const boyProfilePic = 'https://avatar.iran.liara.run/public/boy?userName';
const girlProfilePic = 'https://avatar.iran.liara.run/public/girl?userName';

export const sign = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body; // Destructure request body
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" }); // Return response and terminate function
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "User already exists" }); // Return response and terminate function
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        });
    } catch (err) {
        console.error("Error in sign up controller", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { userName, password } = req.body;
  
    try {
        const user = await User.findOne({ userName });
  
        if (!user) {
            return res.status(400).json({ error: "Invalid password or username" });
        }
  
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password or username" });
        }
  
        generateTokenAndSetCookie(user._id, res);
  
        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = (req, res) => {
   try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
   } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
   }
};
