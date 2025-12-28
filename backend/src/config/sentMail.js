import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});



const sendMail = async(to,otp ) =>{
  await transporter.sendMail({
    from: process.env.USER_EMAIL, // Sender address
    to: to, // List of recipients
    subject: "Reset Your Password", // Subject line
    html: `<p>Your OTP for password reset is: <b>${otp}</b>
    Please use this OTP to reset your password. It is valid for 5 minutes.
    </p>`, // HTML body content
  });


}


export default sendMail ;
