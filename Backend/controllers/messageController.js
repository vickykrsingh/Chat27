import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    const {id:receiverId} = req.params;
    const {message} = req.body;
    const {_id:senderId} = req.user;
    console.log(message,senderId,receiverId)
    try {
        //find existing conversation
        let conversation = await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        //if conversation is doesn't exists create conversation
        if(!conversation){
            conversation = await conversationModel.create({
                participants:[senderId,receiverId]
            })
            const newMessage = new messageModel({
                sender:senderId,
                receiver:receiverId,
                message:message
            })

            if(newMessage){
                conversation.message.push(newMessage._id);
            }
            Promise.all([newMessage.save(),conversation.save()])
            res.status(200).json({
                success:true,
                message:"Message sent successfully",
                newMessage:newMessage
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}