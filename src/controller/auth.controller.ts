import { Request, Response } from "express";
import  User  from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// register api

export const register = async (req:Request,res:Response) => {
  const { name, email, password } = req.body;

  console.log("name is",name);
  console.log("email is",email);

  const exstingUser = await User.findOne({email});
  
  if(exstingUser){
    res.status(400).json({message:"User Email Allready Existing"})
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  const user = await User.findOneAndUpdate(
    
    { email },
    {
      name,
      email,
      password: hashed,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    },
    {upsert:true,returnDocument:"after"}
  );
  await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);

  res.json({ message: "OTP sent to email" });
};

// verify otp

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  console.log("user",user);

  if (!user || user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpires! < new Date())
    return res.status(400).json({ message: "OTP expired" });

  user.isVerified = true;
  user.otp = undefined;
  await user.save();
  res.json({ message: "Account verified" });
};

// login api


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email});

  
  if (!user || !user.isVerified)
    return res.status(400).json({ message: "Invalid Email" });

  const match = await bcrypt.compare(password, user.password!);
  if (!match)
    return res.status(400).json({ message: "Invalid Password" });

  const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  res.json({
    message:"Login Success", 
    token,
   user
 });
};

// forgot password api

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  console.log("email",email);

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

 
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail(email, "Password Reset OTP", `Your OTP is ${otp}`);

  res.json({ message: "OTP sent" });
};

// verifyResetOtp api

export const verifyResetOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  

  const user = await User.findOne({ email });


  if (!user || user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });


  res.json({ message: "OTP verified" });
};

// reset password api

export const resetPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.password = await bcrypt.hash(password, 10);
  user.otp = undefined;

  await user.save();

  res.json({ message: "Password updated" });
};

// change password api
export const changePassword = async (req: Request, res: Response) => {
  try {
    const {currentpassword, newpassword } = req.body;

    console.log("currentpassword is",currentpassword)

    const userId = (req as any).user._id;
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    console.log("req user is",(req as any).user);

    console.log("user is",user)
    // Compare old password
    const isMatch = await bcrypt.compare(
      currentpassword,
      user.password as string);
    if (!isMatch) {
      return res.status(400).json({ message: "Current Password Is Incorect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Update password 
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error)   {
    res.status(500).json({ message: "Server error" });
  }
};

// update profile api
export const updateProfile = async (req:Request,res:Response) =>{
  try{
    const userId = (req as any).user.id;
    const {email,name} = req.body;

    const updateUser = await User.findByIdAndUpdate(userId,{email,name},{new:true}).select("-password");

    if(!updateUser){
      return res.status(404).json({message:"User Not Found"})
    }

    res.json({
      message:"Profile Update SuccessFully",
      user:updateUser,
    })
  }catch(error:any){
    res.status(500).json({
      message:"Server Error",
    });
  }
}

// after  page refresh run this api

  export const me = async (req: any, res: Response) => {
    try {

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findById(req.user._id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);

    } catch (error) {
      res.status(500).json({ message: "Server error"});
    }
};


  