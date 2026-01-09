import uploadOnCloudinary from '../config/cloudinary.js';
import User from '../models/user.model.js';



export const getCurrentUser = async (req, res) => {  
try {
 const  user = await User.findById(req.userId).select('-password').populate('enrolledCourses')
 if(!user){
    return res.status(404).json({message: 'User not found'})
 }
 return res.status(200).json(user)
    
} catch (error) {
    return res.status(500).json({message: `GetCurrent User: ${error.message}`})
    
}


}



export const updateProfile = async (req, res) => {
 
    try {
        const userId = req.userId;
        const { name, description } = req.body;
        let photoUrl 
        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path);
        }

        const user = await User.findByIdAndUpdate( userId,{
            name,
            description,
            photoUrl
        })

        res.json(user);



        if(!user){
         return res.status(404).json({message: 'User not found'})
         }

         await user.save();
        return res.status(200).json(user)
   


    } catch (error) {
        return res.status(500).json({message: `Update Profile Error: ${error.message}`})
        
    }




}