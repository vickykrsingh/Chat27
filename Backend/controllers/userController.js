import mongoose, { Types } from 'mongoose';
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const loginController = async (req,res) => {
    const {email,password} = req.body;
    try {
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        const existingUser = await User.findOne({email}).select("+password");
        console.log(existingUser)
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const isMatch = await existingUser.matchPassword(password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }
        const token = jwt.sign({_id:existingUser._id,name:existingUser.name,email:existingUser.email},process.env.JWT_SECRET,{expiresIn:'5d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite : 'strict', // Prevents CSRF
            maxAge : 5*24*3600000, // 5 day
        })
        return res.status(200).json({
            success:true,
            message:"Login successfully",
            user:{
                name:existingUser.name,
                email:existingUser.email,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}

export const registerController = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        if(!name||!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        console.log(name,email,password)
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(300).json({
                success:false,
                message:"User already exists"
            })
        }
        const newUser = await User.create({
            name,
            email,
            password
        })
        return res.status(200).json({
            success:true,
            message:"Registration successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie('token',null,{
            maxAge:0,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            message:"logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}

export const getAllUsers = async (req,res) => {
    const userId = new mongoose.Types.ObjectId(req.user._id)
    console.log(userId)
    try {
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
        const allUsers = await User.find({_id:{$ne:userId}});
        return res.status(200).json({
            success:true,
            users:allUsers
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message
        })
    }
}