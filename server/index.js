

import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import productRouter from "./route/productRoute.js"
import historyRouter from "./route/historyRoute.js"
import authRouter from "./route/authRoute.js"
import userRouter from "./route/userRouter.js"


const app = express()

const PORT = 500 

// middleware
app.use(cors())

app.use(express.json())

app.use(cookieParser())

// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err))



// ROUTES
app.use("/api/product", productRouter)


app.use("/api/history", historyRouter)


app.use("/api/auth", authRouter)


app.use("/api/user", userRouter)



// api
app.get('/',(req,res) => {

    res.send("HELLO STOCK MARKET")

})


// LISTENING
app.listen(PORT,(err) => {
    
    if(!err)
    {
        console.log(`server running on ${PORT}`)
    }

})


app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 

    const message = err.message || "Internal Serving Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


