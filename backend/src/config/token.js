import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const genToken = async(userID)=>{
 try{

    const token =await jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '7d'});
    return token;


 } catch(error){
    console.log("Token Error");
    console.error("Token Generation Error:", error.message);
 }


}


export default genToken;