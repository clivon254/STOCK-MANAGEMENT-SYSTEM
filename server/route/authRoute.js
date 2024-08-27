

import express from "express"
import { forgotPassword, resetPassword, signin, signout, signup } from "../contoller/authController.js"


const authRouter = express.Router()



authRouter.post("/sign-up", signup)


authRouter.post("/sign-in", signin)


authRouter.post("/sign-out", signout)


authRouter.post("/forgot-password", forgotPassword)


authRouter.post("/reset-password/:token", resetPassword)




export default authRouter