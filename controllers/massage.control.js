import Message from "../models/massege.model.js";
import Conversation from "../models/conversaion.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiveId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiveId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiveId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiveId,
            message,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const {  id:userToChatId } = req.params;
        const senderId = req.user._id;

        const conversaion = await Conversation.findOne({
            participants: { $all: [userToChatId,senderId] },
        })//.populate("messages");

        if (!conversaion) {
            return res.status(404).json({ error: "Conversation not found" });
        }

     //   res.status(200).json("kulith");
        res.status(200).json(conversaion.messages);
        console.log(senderId)
        console.log(userToChatId)

    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
