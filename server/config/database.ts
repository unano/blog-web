import mongoose, { ConnectOptions } from "mongoose";

const URL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(`${URL}`,(err)=>{
    if(err) throw err;
    console.log("mongodb connection");
})