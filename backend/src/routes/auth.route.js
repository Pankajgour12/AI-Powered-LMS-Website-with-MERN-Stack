import express from 'express';
import { googleAuth, login, logout, resetPassword, sendOTP, signUp, verifyOTP,  } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup',signUp);

router.post('/login',login);

router.get('/logout',logout);

router.post('/sendotp',sendOTP);

router.post('/verifyotp',verifyOTP);

router.post('/resetpassword',resetPassword);

router.post('/googleauth',googleAuth);




export default router;