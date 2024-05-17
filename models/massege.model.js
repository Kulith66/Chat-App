import mongoose from "mongoose";
import User from "../models/user.models.js";

const massageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required :true,
    },
    receiveId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required :true,
    },
    message:{
        type:String,
        required:true,
    },
},{timestamps:true});

const Message =mongoose.model("Message",massageSchema);

export default Message;