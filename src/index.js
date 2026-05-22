import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
    path:'./.env'
})

console.log(process.env.MONGODB_URI)

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