import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        select:false,
        required:true
    }
},{timestamps:true})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next()
    try {
        const salt = 8;
        this.password = await bcrypt.hash(this.password,salt);
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

const User = mongoose.model('User',userSchema);
export default User;