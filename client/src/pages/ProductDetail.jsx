

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/Store'
import { Table, TextInput,Label, Spinner, Button } from 'flowbite-react'
import {toast} from "sonner"

export default function ProductDetail() {


    const {url} = useContext(StoreContext)

    const [product ,setProduct] = useState({})

    const Id  = product._id 

    const [useProduct ,setUseProduct] = useState({
      amount:""
    })

    const [restockProduct ,setRestockProduct] = useState({
      restockQuantity:""
    })

    const [history ,setHistory] = useState({})

    const [loading ,setLoading] = useState(false)

    const [error ,setError] = useState(false)

    const params = useParams()

    // fetchProduct
    const fetchProduct = async () => {

        try
        {
          setLoading(true)

          setError(false)

          const res = await axios.get(url + `/api/product/get-product/${params.productId}`)

          if(res.data.success)
          {
              setProduct(res.data.product)

              setLoading(false)

              setError(false)
          }
          else
          {
            setLoading(false)

            setError(true)
          }

        }
        catch(error)
        {
          console.log(error.message)

          setLoading(false)

          setError(true)
        }

    }

    // fetchHistory
    const fetchHistory = async () => {

      try
      {
        const res = await axios.get(url + `/api/history/get-productHistory/${params.productId}`)

        if(res.data.success)
        {
           setHistory(res.data.stockHistory)
        }
      }
      catch(error)
      {
        console.log(error.message)
      }

    }

    useEffect(() => {

      fetchProduct()

      fetchHistory()

    },[])

    // handleChange
    const handleChangeUse = (e) => {

      setUseProduct({...useProduct,[e.target.name]:e.target.value})

    }

    // handleSubmituse
    const handleSubmitUse = async (e) => {

      e.preventDefault()

      try
      {
        const res = await axios.post(url + `/api/product/use-product/${params.productId}`, useProduct)

        if(res.data.success)
        {
          toast.success("portion removed successfully for use")

          fetchProduct()

          fetchHistory()

          setUseProduct({})
        }

      }
      catch(error)
      {
        console.log(error.message)
      }

    }

    // handleChangeRestock
    const handleChangeRestock = (e) => {

      setRestockProduct({...restockProduct,[e.target.name]:e.target.value})
      
    }

    // handleSubmitRestock
    const handleSubmitRestock = async (e) => {

      e.preventDefault()

      try
      {
        const res = await axios.post(url + `/api/product/restock/${params.productId}`, restockProduct)

        if(res.data.success)
        {
          toast.success(" product is successfully RESTOCKED")

          fetchProduct()

          fetchHistory()

          setRestockProduct({})
        }

      }
      catch(error)
      {
        console.log(error.message)
      }

    }

   


  return (

    <>

      {error && (

        <p className="text-center p-4">Something went wrong</p>

      )}

      {loading && (

        <p className="text-center p-4 text-xl font-semibold">

          <Spinner/> Loading .....

        </p>

      )}

      {product && (

        <div className="p-4">

          <div className="contain">

            <h2 className="title">Product Detail</h2>

            <div className="space-y-10">

              {/* product */}
              <div className="flex flex-col md:flex-row gap-x-10  gap-y-10 md:divide-x-2">

                {/* details */}
                <div className="w-full md:w-[40%]">

                  <form  className="flex flex-col gap-y-4  mx-auto">

                      {/* name */}
                      <div className="flex flex-col gap-y-2">
                        
                        <Label value = "Name"/>
                        
                        <TextInput 
                          type="text"
                          placeholder='name'
                          name="name"
                          defaultValue={product.name}
                          readOnly
                        />

                      </div>

                      {/* unit */}
                      <div className="flex flex-col gap-y-2">

                        <Label value="unit"/>

                        <TextInput
                          defaultValue={product.unit}
                          readOnly
                        />

                      </div>

                      {/* quantity */}
                      <div className="flex flex-col gap-y-2">
                        
                        <Label value = "quantity"/>
                        
                        <TextInput 
                          type="number"
                          placeholder='quantity'
                          name="quantity"
                          defaultValue={product.quantity}
                          readOnly
                        />

                      </div>

                      {/* limit */}
                      <div className="flex flex-col gap-y-2">
                        
                        <Label value = "limit"/>
                        
                        <TextInput 
                          type=""
                          placeholder='limit'
                          name="limit"
                          defaultValue={product.limit}
                          readOnly
                        />

                      </div>

                  </form>

                </div>

                {/* forms */}
                <div className="w-full md:w-[60%] space-y-5 md:px-5">

                  {/* restock */}
                  <div className="">

                    <h3 className="subtitle">Restock</h3>

                    <form onSubmit={handleSubmitRestock} className="flex flex-col gap-y-4">

                      <div className="flex flex-col gap-y-2">

                        <Label value="Amount"/>

                        <TextInput 
                            type="number"
                            placeholder='amount'
                            name="restockQuantity"
                            value={restockProduct.restockQuantity}
                            onChange={handleChangeRestock}
                        />

                      </div>

                      <Button 
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                      >
                        Restock
                      </Button>

                    </form>

                  </div>

                  {/* use */}
                   <div className="">

                    <h3 className="subtitle">Use Product</h3>

                    <form onSubmit={handleSubmitUse} className="flex flex-col gap-y-4">


                      <div className="flex flex-col gap-y-2">

                        <Label value="Amount"/>

                        <TextInput 
                            type="number"
                            placeholder='amount'
                            name="amount"
                            value={useProduct.amount}
                            onChange={handleChangeUse}
                        />

                      </div>

                      <Button 
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                      >
                        Submit
                      </Button>

                    </form>

                  </div>

                </div>

              </div>
              
              {/* history */}
              <div className="">

                <h3 className="subtitle">Track product </h3>

                <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                {history?.length > 0 ?
                  (
                    <Table >

                      <Table.Head>


                      <Table.HeadCell>Date</Table.HeadCell>

                        <Table.HeadCell>Name</Table.HeadCell>

                        <Table.HeadCell>action </Table.HeadCell>

                        <Table.HeadCell>quantity</Table.HeadCell>

                        <Table.HeadCell>Total</Table.HeadCell>

                        <Table.HeadCell>unit</Table.HeadCell>

                      </Table.Head>

                      {
                        history?.map((history,index) => (

                          <Table.Body key={history._id}>

                            <Table.Row >

                              <Table.Cell>{new Date(history.timestamp).toLocaleString()}</Table.Cell>

                              <Table.Cell className="capitalize">{history.productId.name}</Table.Cell>

                              <Table.Cell>{history?.type}</Table.Cell>

                              <Table.Cell>{history?.quantity}</Table.Cell>

                              <Table.Cell>{history?.totalQuantity}</Table.Cell>

                              <Table.Cell className="capitalize">{history.productId.unit}</Table.Cell>

                            </Table.Row>

                          </Table.Body>
                        ))
                      }

                  </Table>
                  ) 
                  : 
                  (
                    <p className="">
                      No Products yet
                    </p>
                  )
                }
            
            </div>

              </div>

            </div>

          </div>

        </div>

      )}
  
    </>

  )

}
