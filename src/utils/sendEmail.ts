// import nodemailer from "nodemailer"
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SEND_GRID_API as string);


export const sendEmail = async (to:string,subject:string,text:string) =>{

    try{
        const msg = {
            to,
            from:process.env.USER_EMAIL as string,
            subject,
            text,
        };
        
        await sgMail.send(msg);
        console.log("Mail Sent SuccessFully");
    }catch(error){
        console.error("SendGrid Error",error);
        throw error;
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