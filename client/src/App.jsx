
import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import {useSelector} from "react-redux"
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ListOfProducts from './pages/ListOfProducts'
import AddProduct from './pages/AddProduct'
import AllStockHistory from './pages/AllStockHistory'
import ProductHistory from './pages/ProductHistory'
import Profile from './pages/Profile'
import UseProduct from './pages/UseProduct'
import RestockProduct from './pages/RestockProduct'
import { Toaster } from 'sonner'
import Header from './components/Header'
import DashSidebar from './components/DashSidebar'
import ProductDetail from './pages/ProductDetail'
import SignUp from './pages/SignUp'



function Layout()
{
    const {currentUser} = useSelector((state) => state.user)

    return (

      currentUser ? 

      <div className="w-full flex">

        <div className="hidden md:block w-1/4 h-screen border-r border-slate-300 sticky top-0 left-0">

          <DashSidebar />

        </div>

        <div className="w-full md:w-3/4">

          <Header />

          <div className="w-full">

            <Outlet />

          </div>

        </div>

      </div>
       :
       <Navigate to="/sign-in"/>

    )
}

export default function App() {

  return (

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Routes>

          <Route element={<Layout/>}>

              <Route path="/" element={<ListOfProducts/>}/>

              <Route path="/add-product" element={<AddProduct/>}/>

              <Route path="/all-History" element={<AllStockHistory/>}/>

              <Route path="/product-History/:productId" element={<ProductHistory/>}/>

              <Route path="/profile" element={<Profile/>}/>

              <Route path="/product-Detail/:productId" element={<ProductDetail/>}/>

          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/sign-up" element={<SignUp/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

        </Routes>

        <Toaster richColors />

      </main>

    </BrowserRouter>

  )

}
