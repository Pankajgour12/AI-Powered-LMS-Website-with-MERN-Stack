import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
 


const uploadOnCloudinary = async (filePath) => {

  
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try {
        if(!filePath){
            return null;
        }
        const uploadResult = await cloudinary.uploader
        .upload(filePath,{resource_type:'auto'} )
         
        fs.unlinkSync(filePath); // Delete the local file after upload

        return uploadResult.secure_url;



    } catch (error) {
        fs.unlinkSync(filePath);
        console.error("Cloudinary Upload Error:", error.message);
        
    }



         
}


export default uploadOnCloudinary;