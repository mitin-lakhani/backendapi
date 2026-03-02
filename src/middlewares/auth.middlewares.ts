import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authMiddleWare = async (
    req:any,
    res:Response,
    next:NextFunction) =>{
    const token = req.headers.authorization?.split(" ")[1];
    
    console.log("token-",token);

    if(!token) return res.status(401).json({message:"unauthorized"});

    const decoded:any = jwt.verify(
        token,
        process.env.JWT_SECRET as string
    );

    console.log("decoded value-",decoded);
    const user = await User.findById(decoded._id).select("-password");

    if(!user){
        return res.status(401).json({message:"user not found"})
    }
    (req as any).user = user;
    // req.user = user;
    console.log("request user-",req.user);
    // next();
    try{        
        // const decoded = jwt.verify(token,process.env.SECRET_KEY as string);
        // (req as any).user = decoded;
        next();
    }catch{
        res.status(401).json({message:"invalid token"})
    }
};
