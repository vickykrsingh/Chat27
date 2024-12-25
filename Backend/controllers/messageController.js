import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const { message } = req.body;
  const { _id: senderId } = req.user;
  try {
    //find existing conversation
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //if conversation is doesn't exists create conversation
    if (!conversation) {
      console.log("enter 3");
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new messageModel({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    await Promise.all([newMessage.save(), conversation.save()]);
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      newMessage: newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getMessage = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.id;
  console.log('sender id - ',senderId)
  console.log('receiver id - ',receiverId)
  try {
    // check wheater conversation is exists or not
    let conversation = await conversationModel
      .findOne({ participants: { $all: [senderId, receiverId] } })
      .populate("message");
    console.log(conversation)
    // if conversation doesn't exists create a new conversation
    if (!conversation) {
      return res.json({
        success: false,
        message: "no conversation found",
        data: [],
      });
    }
    const message = await conversation.message;
    return res.status(200).json({
      success: true,
      message: "Message fetched successfully",
      allMessages: message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
