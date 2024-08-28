


import React, { useContext, useState } from 'react'
import Logo from '../components/Logo'
import logo from '../assets/logo.png'
import { Button, Label, TextInput ,Alert} from 'flowbite-react'
import { StoreContext } from '../context/Store'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { TbCheck } from 'react-icons/tb'

export default function ResetPassword() {
 
  const [formData, setFormData] = useState({})

  const {url}  = useContext(StoreContext)

  const {token} = useParams()

  const [resetSuccess,setResetSuccess] = useState(null)

  const [resetFailure,setResetFailure] = useState(null)

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      const res = await axios.post(url + `/api/auth/reset-password/${token}`,formData)

      if(res.data.success)
      {
        setResetSuccess("password reset Successfully")

        setFormData({})
      }
      else
      {
        setResetFailure("password do not match")
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

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

      <div className="w-full max-w-md">

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 px-5">
          
          <div className="flex flex-col gap-y-2">

            <Label value="password"/>

            <TextInput
              type="password"
              placeholder='password'
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

           <div className="flex flex-col gap-y-2">

            <Label value="confirm password"/>

            <TextInput
              type="password"
              placeholder='confirmpassword'
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>

          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
          >
            {resetSuccess ?
                (
                  <span className="flex items-center gap-x-3">
                    Password reset successfully <TbCheck size={20} className="font-bold" />
                  </span>
                ) 
                 : 
                (
                  "reset Password"
                )
             }
          </Button>

        </form>

        <div className="px-5 py-5">
            {resetSuccess && (

              <Alert color="success">{resetSuccess}</Alert>

            )}

            {resetFailure && (

              <Alert color="failure">{resetFailure}</Alert>

            )}
          </div>

      </div>

    </div>

  )
}
