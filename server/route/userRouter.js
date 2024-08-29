

import express from "express"
import { deleteUser, updateUser } from "../contoller/userController.js"
import { verifyToken } from "../utils/verifyToken.js"


const userRouter = express.Router()


userRouter.put("/update-user/:userId", updateUser)


userRouter.delete("/delete-user/:userId", deleteUser)


export default userRouter 