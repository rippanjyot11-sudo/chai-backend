import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

// import routes
import userRouter from './routes/user.routes.js'

// routes decalration
//app.use("/users",userRouter) // jb users pe jao to userrouter ko activate kro
// for good practice
app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/users/register ye bnega  


export { app }