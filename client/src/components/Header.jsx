

import axios from 'axios'
import { Avatar, Drawer, DrawerHeader, Dropdown, Navbar } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/Store'
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import DashSidebar from './DashSidebar'
import { MdClose, MdMenu } from "react-icons/md"
import { FaMoon, FaSun } from "react-icons/fa"
import Logo from './Logo'
import { toggleTheme } from '../redux/theme/themeSlice'
import {Link} from "react-router-dom"


export default function Header() {

    const {url} = useContext(StoreContext)

    const {theme} = useSelector(state => state.theme)

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

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

    <>
        <Navbar className="border-b py-2">

            <div className="md:hidden">
                {
                    isOpen ? 
                    (
                        <MdClose 
                            size={25}
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer"
                        />
                    ) 
                    : 
                    (
                        <MdMenu 
                            size={25}
                            onClick={() => setIsOpen(true)}
                            className="cursor-pointer"
                        />
                    )
                }
            </div>

            <div className="">

                <Logo />

            </div>

            <div className="flex items-center gap-x-2 md:order-2">

                <button 
                    className="w-10 h-10 flex items-center justify-center border rounded-full border-gray-300"
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === "light" ? <FaSun/>: <FaMoon/>}
                </button>

                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar 
                            alt="user"
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>

                        <span className="block text-sm">{currentUser.username}</span>

                        <span className="block text-sm font-medium truncate">{currentUser.email}</span>

                    </Dropdown.Header>

                    <Link to="/profile">

                        <Dropdown.Item>
                            Profile
                        </Dropdown.Item>

                    </Link>

                    <Dropdown.Item onClick={handleSignOut}>
                       Sign out
                    </Dropdown.Item>

                </Dropdown>

            </div>

        </Navbar>

        <Drawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="md:hidden"
        >
            <DrawerHeader titleIcon={() => <></>}/>

            <Drawer.Items>

                <DashSidebar/>

            </Drawer.Items>

        </Drawer>
    </>

  )

}
