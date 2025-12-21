
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import cookieParser from 'cookie-parser';
import router from './src/routes/auth.route.js';

dotenv.config();


const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',router)



app.get('/', (req, res) => {
  res.send('Hello, LearnFlow! The backend is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();



});