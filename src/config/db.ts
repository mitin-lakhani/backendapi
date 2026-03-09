import mongoose from "mongoose"

export const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("mongoodb connect")
    }catch(error){
        console.log("data base error",error);
        process.exit(1);
    }
}


