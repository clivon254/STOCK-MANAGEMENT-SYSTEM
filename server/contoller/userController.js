

import bcryptjs from "bcryptjs"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"


export const updateUser = async (req,res,next) => {

    // if(req.user.id !== req.params.userId )
    // {
    //     return next(errorHandler(403,"You are not allowed to update this user"))

    // }

    if(req.body.password)
    {
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    try
    {
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture 
            }
        },{new:true})

        const {password, ...rest} = updateUser._doc

        res.status(200).json({success:true ,rest})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteUser = async (req,res,next) => {

    if( !req.user.isAdmin || req.user.id !== req.params.userId )
    {
        return next(errorHandler(403,"You are not allowed to delete this user"))
    }

    try
    {
        await Employee.findByIdAndDelete(req.params.userId)

        res.status(200).json({success:true , message:"User has been deleted"})

    }
    catch(error)
    {
        next(error)
    }

}
