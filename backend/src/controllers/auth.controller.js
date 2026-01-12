import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sentMail.js";


export const signUp = async (req, res) => {

try {
    const { name, email, password, role } = req.body;

    let existUser = await User.findOne({ email });

    if (existUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({ message: "Invalid Email" });
    }

    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    let token = await genToken (newUser._id);
    

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

   

    // return  res.status(201).json({ message: "User created successfully" });
  return res.status(201).json({
  message: "User created successfully",
  user: {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  },
});


    


} catch (error) {
    console.error("Sign Up Error:", error.message);
    res.status(500).json({ message: `Server Error: ${error.message}` });
    
}



}


export const login = async (req, res) => {
 try {

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    
    if(!user){
        return res.status(400).json({ message: "Invalid email or password" });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid email or password" });
    }

    let token = await genToken(user._id);
    console.log(token);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res.status(200).json({ message: "Login successful" });
return res.status(200).json({
  message: "Login successful",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

    
 } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: `Server Error: ${error.message}` });
    

 }




}


export const logout = async (req, res) => {
    try {
       await res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0,
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};




export const sendOTP = async (req, res) => {
 try {

    const { email } = req.body;

    let user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message: "User with this email does not exist" });
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Set OTP expiry time (5 minutes from now)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.resetOtp = otp;
    user.otpExpiry = otpExpiry;
    user.isOtpVerified = false;



    await user.save();


    await sendMail(email, otp)
    return res.status(200).json({ message: "OTP sent to your email" });


    
 } catch (error) {
    return res.status(500).json({ message: `Sent OTP Error: ${error.message}` });
    
 }


}

export const verifyOTP = async (req, res) => {
 try {

    const { email, otp } = req.body;
    const user = await User.findOne({
        email,
        resetOtp: otp,
        otpExpiry: { $gt: new Date() },
    });
    if(!user){
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isOtpVerified = true;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
    
    } catch (error) {
    return res.status(500).json({ message: `Verify OTP Error: ${error.message}` });
    
 }
}



export const resetPassword = async (req, res) => {
 try {  
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message: "User with this email does not exist" });
    }   
    if(!user.isOtpVerified){
        return res.status(400).json({ message: "OTP not verified" });
    }       
       
    let hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
    return res.status(500).json({ message: `Reset Password Error: ${error.message}` });
    
 }
}



export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role,
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    
    return res.status(200).json({
      message: "Google auth successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    return res.status(500).json({
      message: "Google authentication failed",
    });
  }
};

