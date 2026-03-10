// import nodemailer from "nodemailer"
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);


export const sendEmail = async (to:string,subject:string,text:string) =>{
        const msg = {
            to,
            from:process.env.USER_EMAIL as string,
            subject,
            text,
        };  
        
        await sgMail.send(msg);
        console.log("Mail Sent SuccessFully");

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