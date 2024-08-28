


import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import axios from "axios"
import {toast} from "sonner"
import { StoreContext } from '../context/Store'
import { HiCalendar, HiLogout, HiViewGridAdd, HiViewList } from "react-icons/hi"
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'

export default function DashSidebar() {

    const {url} = useContext(StoreContext)

    const dispatch = useDispatch()

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

    <Sidebar className="w-full h-full">

        <Sidebar.Items>

            <Sidebar.ItemGroup className='space-y-3'>

                <img 
                   src={logo} 
                   alt="" 
                   className=" h-10 w-20 " 
                />

                <div className="flex flex-col gap-y-2">

                    <Link to="/">

                        <Sidebar.Item
                            icon={HiViewList}
                            as="div"
                            active={window.location.pathname === '/' }
                        >
                            List of Products
                        </Sidebar.Item>

                    </Link>

                    <Link to="/add-product">

                        <Sidebar.Item
                            icon={HiViewGridAdd}
                            as="div"
                            active={window.location.pathname === '/add-product' }
                        >
                            Add Product
                        </Sidebar.Item>

                    </Link>

                    <Link to="/all-History">

                        <Sidebar.Item
                            icon={HiCalendar}
                            as="div"
                            active={window.location.pathname === '/all-History' }
                        >
                            Track History
                        </Sidebar.Item>

                    </Link>

                    <Sidebar.Item
                        icon={HiLogout}
                        as="div"
                        onClick={handleSignOut}
                        className="cursor-pointer"
                    >
                        sign out
                    </Sidebar.Item>
                    

                </div>

            </Sidebar.ItemGroup>

        </Sidebar.Items>

    </Sidebar>

  )

}
