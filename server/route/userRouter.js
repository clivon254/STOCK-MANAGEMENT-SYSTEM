

import express from "express"
import { deleteUser, updateUser } from "../contoller/userController.js"
import { verifyToken } from "../utils/verifyToken.js"


const userRouter = express.Router()


userRouter.put("/update-user/:userId",verifyToken, updateUser)


userRouter.delete("/delete-user/:userId",verifyToken, deleteUser)


export default userRouter 