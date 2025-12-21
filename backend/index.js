
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config();


const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, LearnFlow! The backend is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();



});