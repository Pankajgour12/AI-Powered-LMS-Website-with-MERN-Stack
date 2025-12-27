import expre from 'express';
import isAuth from '../middleware/auth.middleware.js';
import { getCurrentUser } from '../controllers/user.controller.js';


const userRouter = expre.Router();


userRouter.get('/getcurrentuser',isAuth, getCurrentUser)


export default userRouter;