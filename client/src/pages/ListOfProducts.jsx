
import { Table } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../context/Store'
import { FaEdit } from "react-icons/fa"
import {Link} from "react-router-dom"


export default function ListOfProducts() {

  const [products ,setProducts] = useState([])

  const {url} = useContext(StoreContext)


  // fetchProducts
  const fetchProducts = async () => {

    try
    {
      const res = await axios.get(url + "/api/product/get-Stock")

      if(res.data.success)
      {
        setProducts(res.data.products)
      }
      else
      {
        console.log("there is problem at the api")
      }
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  useEffect(() => {

    fetchProducts()

  },[])


  return (

    <div className="px-4 py-2">

      <div className="containing">

        <h2 className="title"> Products</h2>

        <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

        {products.length > 0 ?
          (
            <Table >

              <Table.Head>

                <Table.HeadCell></Table.HeadCell>

                <Table.HeadCell>Name</Table.HeadCell>

                <Table.HeadCell>initial </Table.HeadCell>

                <Table.HeadCell>Quantity</Table.HeadCell>

                <Table.HeadCell>unit</Table.HeadCell>

                <Table.HeadCell>limit</Table.HeadCell>

                <Table.HeadCell>last updated</Table.HeadCell>

                <Table.HeadCell>actions</Table.HeadCell>

              </Table.Head>

              {
                products?.map((product,index) => (

                  <Table.Body key={product._id}>

                    <Table.Row >

                      <Table.Cell>{index+1}.</Table.Cell>

                      <Table.Cell className="capitalize">{product.name}</Table.Cell>

                      <Table.Cell>{product?.initialQuantity}</Table.Cell>

                      <Table.Cell>{product?.quantity}</Table.Cell>

                      <Table.Cell>{product?.unit}</Table.Cell>

                      <Table.Cell>{product?.limit}</Table.Cell>

                      <Table.Cell>{new Date(product.updatedAt).toLocaleDateString()}</Table.Cell>

                      <Table.Cell>

                        <div className="flex items-center justify-items-center">
                          
                          <Link to={`/product-Detail/${product._id}`}>
                            
                            <FaEdit size={22}/>

                          </Link>

                        </div>

                      </Table.Cell>

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

  )
}
