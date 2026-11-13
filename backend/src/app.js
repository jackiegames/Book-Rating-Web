import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express(); // create an express app

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

//routes import
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';


//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


//example route: http://localhost:4000/api/v1/users/register

export default app;
