import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";


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
    console.log(token);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
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
        secure: false,
        sameSite: "strict",
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
            secure: false,
            sameSite: "strict",
            maxAge: 0,
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};