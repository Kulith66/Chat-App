import { connect } from "http2";
import mongoose from "mongoose";

export const connectToMongodb = async()=>{
    try {
        await mongoose.connect("mongodb+srv://jpksathnindu:pakaya@cluster0.wh0sg08.mongodb.net/chat-app-DB?retryWrites=true&w=majority");
        console.log("connected to mongodb")
       
    } catch (error) {
        console.log(error)
    }
}