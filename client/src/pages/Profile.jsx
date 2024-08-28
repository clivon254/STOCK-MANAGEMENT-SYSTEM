

import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../context/Store'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, uploadBytesResumable,ref } from "firebase/storage"
import { app } from '../firebase'
import { signOutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert, Button, TextInput } from 'flowbite-react'


export default function Profile() {
  
  const {currentUser,loading, error} = useSelector(state => state.user)

  const {url} = useContext(StoreContext)

  const [imageFile, setImageFile] = useState(null)

  const [imageFileUrl, setImageFileUrl] = useState(null)

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)

  const [imageFileUploading, setImageFileUploading] = useState(false)

  const [imageFileUploadingError, setImageFileUploadingError] = useState(null)

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  
  const [updateUserError, setupdateUserError] = useState(null)

  const [formData ,setFormData] = useState({})

  const filePickerRef = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // handleImageChange
  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if(file)
    {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  useEffect(() => {

    if(imageFile)
    {
      uploadImage()
    }

  },[imageFile])

  // uploadImage
  const uploadImage = async () => {

    setImageFileUploading(true)

    setImageFileUploadingError(null)

    const storage = getStorage(app)

    const fileName = new Date().getTime() + imageFile.name

    const storageRef = ref(storage, fileName)

    const uploadTask  = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100 ;

        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {

        setImageFileUploadingError(
          "could not upload image (File must be less then 2MB)"
        )

        setImageFileUploadProgress(null)

        setImageFile(null)

        setImageFileUrl(null)

        setImageFileUploading(false)

      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setImageFileUrl(downloadURL)


          setFormData({...formData, profilePicture:downloadURL})

          setImageFileUploading(false)

        })
      }
    )
  }

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()


    setupdateUserError(null)

    setUpdateUserSuccess(null)

    if(Object.keys(formData).length === 0)
    {
      setupdateUserError("No changes made")
    }

    if(imageFileUploading)
    {
      setupdateUserError("Please wait for the image to upload")

      return
    }


    try
    {
      dispatch(updateStart())

      const res = await axios.put(url + `/api/user/update-user/${currentUser._id}`,formData)

      if(res.data.success)
      {
        dispatch(updateSuccess(res.data.rest))

        setUpdateUserSuccess("User's profile updated successfully ")
      }
      else
      {
        dispatch(updateFailure(res.data.message))

        setupdateUserError(res.data.message)
      }

    }
    catch(error)
    {
      dispatch(updateFailure(error.message))

      setupdateUserError(error.message)
    }

  }

  // handleSignOut
  const handleSignOut = async () => {

    try
    {
        const res = await axios.post(url + "/api/auth/sign-out")

        if(res.data.success)
        {
            dispatch(signOutSuccess())

            toast.success("you have sign out successfull")

            navigate('/sign-in')
        }
    }
    catch(error)
    {
        console.log(error)
    }

}

  return (

    <div className="px-4 py-4">

      <div className="max-w-md mx-auto containing">

        <h1 className="title">Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input 
            type="file" 
            accept='image/*'
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />

          <div 
            className="relative w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {
              imageFileUploadProgress && (

                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root:{
                      width:'100%',
                      height:'100%',
                      position:'absoulute',
                      top:0,
                      left:0
                    },
                    path:{
                      stroke:`rgba(6,152,199,${imageFileUploadProgress /100})`
                    }
                  }}
                 />
              )
            }

            <img 
              src={imageFileUrl || currentUser.profilePicture} 
              alt="user" 
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
                      ${imageFileUploadProgress && imageFileUploading < 100 && "opacity-60" }`}
            />

          </div>

          {
            imageFileUploadProgress && (
              <Alert color="failure">
                {imageFileUploadingError}
              </Alert>
            )
          }

          <TextInput 
            type="text"
            name="username"
            placeholder='username'
            defaultValue={currentUser.username}
            onChange={handleChange}
          />

          <TextInput 
            type="email"
            name="email"
            placeholder='email'
            defaultValue={currentUser.email}
            onChange={handleChange}
          />

          <TextInput 
            type="password"
            name="password"
            placeholder='password'
            defaultValue={currentUser.password}
            onChange={handleChange}
          />

          <Button 
           type="submit"
           gradientDuoTone="greenToBlue"
           disabled={loading || imageFileUploading}
          >
            {loading ? "Loading ...." :"update"}
          </Button>

        </form>

        <div className="text-red-500 flex justify-center mt-5">

          <span onClick={handleSignOut} className="cursor-pointer">
            sign out
          </span>

        </div>

        {
          updateUserSuccess && (
            <Alert color="success" className="mt-5 ">
              {updateUserSuccess}
            </Alert>
          )
        }

        {
          updateUserError && (
            <Alert color="failure" className="mt-5 ">
              {updateUserError}
            </Alert>
          )
        }

        {
          error && (
            <Alert color="failure" className="mt-5 ">
              {error}
            </Alert>
          )
        }

      </div>

    </div>

  )
}
