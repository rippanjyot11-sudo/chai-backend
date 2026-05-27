import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})
import { configureCloudinary } from "./utils/cloudinary.js";
configureCloudinary();
import { app } from "./app.js";
console.log(process.env.MONGODB_URI)
console.log("ENV KEY:", process.env.CLOUDINARY_API_KEY);
console.log("ENV SECRET:", process.env.CLOUDINARY_API_SECRET);
console.log("ENV NAME:", process.env.CLOUDINARY_CLOUD_NAME);

import connectDB from "./db/index.js";

connectDB()
.then(()=>{
app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running at  port :${process.env.PORT}`);
})
})// jaise database connect to ye chala do since databe vala sync function hai to then lagate hai
.catch((err)=>{
    console.log("'MONGO db Connection failed !!!", err);
})
/*
import express from "express"
const app=express()
(async ()=>{
try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
        console.log("ERRR:",error);
        throw error
    })
        app.listen{process.env.PORT,()=>{
            console.log(`app is listenig on port${process.env.PORT}`)}}
}catch(error){
    console.error("ERROR:",error)
    throw err
}
})()
*/