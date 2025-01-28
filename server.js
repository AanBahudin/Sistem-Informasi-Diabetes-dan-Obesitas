import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Route
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import newsRouter from './routes/newsRoute.js';
import messageRouter from './routes/messageRoute.js';

// Errors
import errorHandler from './errors/ErrorHandler.js';

// Middleware
import { authenticatedUser } from './middleware/authMiddleware.js';
import { StatusCodes } from 'http-status-codes';

const app = express();
dotenv.config();
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json());

// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Serve Static Files (Frontend Build)
app.use(express.static(path.resolve(__dirname, './client/dist')));

// API Routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticatedUser, userRouter);

// Catch-all Route for React Frontend (Handling all non-API requests)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// Error Handler Middleware
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is running on port 5000");
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

await start();
