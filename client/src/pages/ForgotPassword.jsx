

import React, { useContext, useState } from 'react'
import Logo from '../components/Logo'
import logo from '../assets/logo.png'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import axios from "axios"
import { StoreContext } from '../context/Store'
import { TbCheck } from 'react-icons/tb'


export default function ForgotPassword() {
  
  const [formData ,setFormData] = useState({})

  const {url} = useContext(StoreContext)

  const [emailSuccess,setEmailSuccess] = useState(null)

  const [emailFailure,setEmailFailure] = useState(null)

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    { 
      const res = await axios.post(url + "/api/auth/forgot-password", formData)

      if(res.data.success)
      {
        setEmailSuccess("Link sent to your email")
      }
      else
      {
        setEmailFailure("user not found")
      }

    }
    catch(error)
    {
      console.log(error.message)

      setEmailFailure(error.message)
    }

  }

  // handleChange 
  const handleChange = async (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  return (

    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b md:bg-gradient-to-r from-black via-[#071b3e] to-black">

        <div className="flex flex-col items-center gap-y-3">

          <img 
              src={logo} 
              alt="" 
              className="w-20 h-10" 
          />

          <Logo/>

        </div>

        <div className="w-full max-w-md ">

          <h2 className="text-center my-5 text-base text-gray-200 px-5">
            Enter your email and a link will be sent your email account to reset the password
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 px-5">
            
            <div className="flex flex-col gap-y-2">

              <Label value="Enter your email"/>

              <TextInput
                type="email"
                placeholder='name@gmail.com'
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
            >
              {
                emailSuccess ? 
                (
                  <span className="flex  items-center  gap-x-2 ">
                    Email Sent <TbCheck size={20}/>
                  </span>
                )
                 :
                ("send")
                }
            </Button>

          </form>

          <div className="px-5 ">
            {emailSuccess && (

              <Alert color="success" className="my-3">{emailSuccess}</Alert>

            )}

            {emailFailure && (

              <Alert color="failure" className="my-3">{emailFailure}</Alert>

            )}
          </div>

        </div>

    </div>

  )

}
