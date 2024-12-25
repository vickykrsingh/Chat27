import mongoose, { Types } from "mongoose";
// import User from "./user.model";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true,
        trim:true,
        maxLength:1000,
        validate:[
            {
                validator:(value)=>value.length>0,
                message:"Message cannot be empty"
            }
        ]
    },
    createdAt:{type:Date,default:Date.now}
},{timestamps:true})

const messageModel = mongoose.model('Message',messageSchema)
export default messageModel