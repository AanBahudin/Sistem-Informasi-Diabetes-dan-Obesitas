import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';

// route
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import newsRouter from './routes/newsRoute.js';

// errors
import errorHandler from './errors/ErrorHandler.js';

const app = express();
dotenv.config();
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send('Hello there')
});

// using route
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

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
