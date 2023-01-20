import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes';
import * as seedData from "./seedData"

import "./config/database";

if (process.env.NODE_ENV === "development") {
    console.log("-------IN DEVELOPMENT-------")
    seedData.reloadUsers();
    seedData.reloadCategories();
    seedData.reloadBlogs();
}

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//rotes
app.use('/api',routes.authRouter);
app.use("/api", routes.userRouter);
app.use("/api", routes.categoryRouter);
app.use("/api", routes.blogRouter);
app.use("/api", routes.commentRouter)

// sever lisening
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})