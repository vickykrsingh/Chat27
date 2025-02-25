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
        res.cookie('token', token, {
            maxAge: 86400000, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS only in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-origin, 'Lax' for same-origin
        });
        return res.status(200).json({
            success:true,
            message:"Login successfully",
            user:{
                name:existingUser.name,
                email:existingUser.email,
                _id:existingUser._id
            }
        })
    } catch (error) {
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

export const getUserById = async (req,res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"Id is required",
            user:null
        })
    }
    try {
        const currentUser = await User.findById(id);
        return res.status(200).json({
            success:true,
            message:"User fetched successfully",
            user:{
                name:currentUser.name,
                email:currentUser.email,
                _id:currentUser._id
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server error",
            user:null
        })
    }
}

export const getUserInfo = (req,res) => {
    return res.status(200).json({
        success:true,
        user:req.user
    })
}