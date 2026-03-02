import mongoose from "mongoose";
import { number } from "zod";
import { required } from "zod/mini";

// define the objects userSchema
const userSchema = new mongoose.Schema(
    {
        name:String,
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:String,
        currentpassword:String,
        isVerified:{type:Boolean,default:false},
        otp:String,
        otpExpires:Date,
    });
const User = mongoose.model("User",userSchema);
export default User;
