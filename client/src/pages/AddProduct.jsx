
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Store'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { TextInput,Label, Select, Button } from 'flowbite-react'

export default function AddProduct() {

  const {url} = useContext(StoreContext)

  const [formData , setFormData] = useState({})

  const navigate = useNavigate()

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  //handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
        const res = await axios.post(url + "/api/product/add-product",formData)

        if(res.data.success)
        {
          toast.success(`${res.data.product.name} is successfully created`)

          setFormData({})

          // setTimeout(() => {

          //   navigate(`/product-Detail/${res.data.product._id}`)

          // },5000)
        } 

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  return (

    <div className="p-4">

      <div className="contain">

        <h2 className="title">Add Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 max-w-md mx-auto">

            {/* name */}
            <div className="flex flex-col gap-y-2">
              
              <Label value = "Name"/>
              
              <TextInput 
                 type="text"
                 placeholder='name'
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
              />

            </div>

            {/* unit */}
            <div className="flex flex-col gap-y-2">

              <Label value="unit"/>

                <Select 
                  placeholder="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="kg" >Kg</option>

                  <option value="g" >g</option>

                  <option value="pcs" >pcs</option>

                  <option value="liters" >liters</option>

                  <option value="ml" >ml</option>

                </Select>

            </div>

            {/* quantity */}
            <div className="flex flex-col gap-y-2">
              
              <Label value = "quantity"/>
              
              <TextInput 
                 type="number"
                 placeholder='quantity'
                 name="quantity"
                 value={formData.quantity}
                 onChange={handleChange}
              />

            </div>

            {/* limit */}
            <div className="flex flex-col gap-y-2">
              
              <Label value = "limit"/>
              
              <TextInput 
                 type=""
                 placeholder='limit'
                 name="limit"
                 value={formData.limit}
                 onChange={handleChange}
              />

            </div>


            <Button 
              type="submit"
              gradientDuoTone="cyanToBlue"
             >
              submit
            </Button>

        </form>

      </div>

    </div>

  )
}
