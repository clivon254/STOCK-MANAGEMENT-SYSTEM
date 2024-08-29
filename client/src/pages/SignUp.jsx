

import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import logo from '../assets/logo.png'
import { Button, Label, Spinner, TextInput } from "flowbite-react"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import {toast} from "sonner"
import { StoreContext } from '../context/Store'

export default function SignUp() {

    const {url} = useContext(StoreContext)

    const [formData,setFormData] = useState({})

    const {loading,error} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleChange
    const handleChange = async (event) => {

        const name = event.target.name ;

        const value = event.target.value ;

        setFormData(data => ({...data,[name]:value}))
    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData.email || !formData.password || !formData.username)
        {
            return dispatch(signInFailure('Please fill out all the feilds'))
        }

        try
        {

            const res = await axios.post(url + '/api/auth/sign-up', formData)

            if(res.data.success)
            {
                
                toast.success("user created successfully")

                navigate('/profile')
            }
            else
            {
                dispatch(signInFailure(res.data.message))

                toast.error("wrong password or email")
            }
        }
        catch(error)
        {
            console.log(error.message)

            dispatch(signInFailure(error.message))
        }

    }

  return (

    <div className="w-full h-screen flex">

        <div className="hidden md:flex flex-col items-center justify-center gap-y-4 min-h-screen w-1/3 bg-black">

            <img 
                src={logo} 
                alt="logo" 
                className="h-30 w-20" 
            />

            <Logo />

            <span className="text-xl lg:text-lg font">
                Welcome back !
            </span>

        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-2/3 h-screen bg-gradient-to-b md:bg-gradient-to-r from-black via-[#071b3e] to-black px-5">

            {/* logo */}
            <div className="md:hidden flex flex-col items-center gap-y-5">

                <img 
                    src={logo} 
                    alt="" 
                    className="w-20 h-10" 
                />

                <Logo/>

            </div>
            
            <div className="max-w-md w-full">

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    
                    {/* username*/}
                    <div className="flex flex-col gap-y-2">

                        <Label className="text-gray-200" value="username"/>

                        <TextInput
                            type="text"
                            placeholder='username'
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />

                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-y-2">

                        <Label className="text-gray-200" value="email"/>

                        <TextInput
                            type="email"
                            placeholder='name@gmail.com'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    {/* password */}
                    <div className="flex flex-col gap-y-2">

                        <Label className="text-gray-200" value="password"/>

                        <TextInput
                            type="password"
                            placeholder='******'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="flex items-center justify-between text-gray-200">

                        <span className="text-xs flex items-center gap-2 font-semibold">
                            <input type="checkbox" className="rounded" />
                            Remember me
                        </span>

                        <span className="">

                            <Link to="/forgot-password" className='text-xs font-semibold'>

                                forgot password?

                            </Link>

                        </span>
                    </div>

                    <Button
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                        disabled={loading}
                    >
                        {
                            loading ? 
                            (
                                <>
                                    <Spinner/>

                                    <span className="pl-3">Loading ....</span>
                                </>
                            )
                            :
                            (
                                "Sign in"
                            )
                        }
                    </Button>

                </form>

            </div>

        </div>

    </div>

  )

}
