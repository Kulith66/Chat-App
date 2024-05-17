import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser"; // No longer needed

import authRoutes from "./routes/authRoutes.js";
import massegeRoutes from "./routes/massegeRoutes.js"
import { connectToMongodb } from "./db/connectToMongodb.js";


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(express.json()); 
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/messages",massegeRoutes);

app.listen(PORT, () => {
    connectToMongodb();
    console.log("Server running on port " + PORT);
});
