import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

console.log(process.env.MONGODB_URI)

import connectDB from "./db/index.js";

connectDB()
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