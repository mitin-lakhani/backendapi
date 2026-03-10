
import dotenv from "dotenv";
dotenv.config()
// import nodemailer from "nodemailer"
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

console.log(process.env.SENDGRID_API_KEY)
console.log(process.env.USER_EMAIL);


export const sendEmail = async (to:string,subject:string,text:string) =>{
    try{
          const msg = {
            to:to,
            from:process.env.USER_EMAIL as string,
            subject:"otp varification",
            text
        }; 
        await sgMail.send(msg);
        console.log("Mail Sent SuccessFully");
    }catch(error:any){
        console.log("send error",error.response?.body || error);
    }

    // const transporter = nodemailer.createTransport({
    //    service:"gmail",
    //    host:"smtp.gmail.com",
    //    port:465,
    //    secure:true,
    //     auth:{
    //         user:process.env.USER_EMAIL,
    //         pass:process.env.USER_PASS,
    //     },
    // });
    // await transporter.sendMail({
    //     from:process.env.USER_EMAIL,
    //     to,
    //     subject,
    //     text
    // })
}