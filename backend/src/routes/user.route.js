import expre from 'express';
import isAuth from '../middleware/auth.middleware.js';
import { getCurrentUser, updateProfile } from '../controllers/user.controller.js';
import upload from '../middleware/multer.js';


const userRouter = expre.Router();


userRouter.get('/getcurrentuser',isAuth, getCurrentUser)

userRouter.post('/profile',isAuth,upload.single('photoUrl') , updateProfile)


export default userRouter;