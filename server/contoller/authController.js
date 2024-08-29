
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


export const signup = async (req,res,next) => {

    const {username,email,password} = req.body

    if(!username || !password || !email || username === "" || email === "" || password === "")
    {
        return next(errorHandler(400, "All feilds are required"))
    }

    if(password < 6)
    {
        return next(errorHandler(400,"password is too short"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        password:hashedPassword,
        email
    })

    try
    {
        await newUser.save()

        res.status(200).json({success:true, message:"User created successfully"})

    }
    catch(error)
    {
        next(error)
    }

}

export const signin = async (req,res,next) => {

    const {email,password} = req.body

    if(!email || !password || email === '' || password === "")
    {
        return next(errorHandler(400,"all feild are required"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            return next(errorHandler(400,"Your password is incorrect"))
        }

        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin},
            process.env.JWT_SECRETE
        )

        const {password:pass, ...rest} = user._doc 

        res.status(200)
            .cookie('access_token',token,{httpOnly:true})
            .json({success:true ,rest})
    }
    catch(error)
    {
        next(error)
    }

}

export const signout = async (req,res,next) => {

    try
    {
        res.clearCookie("acces_token")
            .status(200)
            .json({success:true , message:"You have successfully sign out"})

    }
    catch(error)
    {
        next(error)
    }

}

export const forgotPassword = async (req,res,next) => {

    const {email} = req.body ;

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const token = jwt.sign({id:user._id },
                            process.env.JWT_SECRETE,
                            {expiresIn:'1h'}
                      )
        
        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:'clivon84@gmail.com',
                pass:"fopidwyigxqtsooy"
            }
        })

        var mailOptions = {
            from:"clivon84@gmail.com",
            to:user.email,
            subject:"Reset Password",
            text:`Click on this link to reset your password: https://stock-management-system-frontend-31s1.onrender.com/reset-password/${token}`
        }

        transporter.sendMail(mailOptions ,(error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }

        })

        res.status(200).json({success:true ,message:"link sent to your email successfully"})
    }
    catch(error)
    {
        next(error)
    }

}

export const resetPassword = async (req,res,next) => {
    
    const {token} = req.params ;

    const {password ,confirmPassword} = req.body ;

    try
    {
        const decodedToken = jwt.verify(token ,process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(404,"User not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400,"Passwords do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10)


        user.password = hashedPassword ;

        await user.save()

        res.status(200).json({success:true , message:"Password reset successfully"})

    }
    catch(error)
    {
        next(error)
    }

}

