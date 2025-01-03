import 'express-async-errors'

import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary'

// route
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import newsRouter from './routes/newsRoute.js';
import messageRouter from './routes/messageRoute.js';

// errors
import errorHandler from './errors/ErrorHandler.js';


// middleware
import { authenticatedUser } from './middleware/authMiddleware.js'

const app = express();
dotenv.config();
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json());

// cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// using route
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticatedUser, userRouter);

app.use(errorHandler);

const start = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        app.listen(process.env.PORT || 5000, () => {
            console.log("server is running on port 5000");
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

await start();
