
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import cookieParser from 'cookie-parser';
import router from './src/routes/auth.route.js';
import cors from 'cors';
import userRouter from './src/routes/user.route.js';
import courseRouter from './src/routes/course.route.js';
import paymentRouter from './src/routes/payment.route.js';
import reviewRouter from './src/routes/review.route.js';

dotenv.config();


const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());


 app.use(cors({
   origin: 'https://ai-powered-lms-website-with-mern-stack-1.onrender.com',
   credentials: true,
 })); 
 

/* app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
 */



app.use('/api/auth',router)
app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)
app.use('/api/order',paymentRouter)
app.use('/api/review',reviewRouter)



app.get('/', (req, res) => {
  res.send('Hello, LearnFlow! The backend is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();



});