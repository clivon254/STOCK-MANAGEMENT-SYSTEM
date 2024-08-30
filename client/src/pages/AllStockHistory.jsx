
import { Table } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../context/Store'
import { FaEdit } from "react-icons/fa"
import {Link} from "react-router-dom"


export default function AllStockHistory() {

  const [history ,setHistory] = useState([])

  const {url} = useContext(StoreContext)


  // fetchProducts
  const fetchHistory = async () => {

    try
    {
      const res = await axios.get(url + "/api/history/get-stockHistory")

      if(res.data.success)
      {
        setHistory(res.data.stockHistory)
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

    fetchHistory()

  },[])


  return (

    <div className="px-4 py-2">

      <div className="containing">

        <h2 className="title">History</h2>

        <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

        {history?.length > 0 ?
          (
            <Table >

              <Table.Head>


               <Table.HeadCell></Table.HeadCell>

               <Table.HeadCell>Date</Table.HeadCell>

                <Table.HeadCell>Name</Table.HeadCell>

                <Table.HeadCell>action </Table.HeadCell>

                <Table.HeadCell>quantity</Table.HeadCell>

                <Table.HeadCell>Total</Table.HeadCell>

                <Table.HeadCell>unit</Table.HeadCell>

              </Table.Head>

              {
                history?.map((history,index) => (

                  <Table.Body key={history?._id}>

                    <Table.Row >

                    <Table.Cell>{index+1}.</Table.Cell>

                      <Table.Cell>{new Date(history?.timestamp).toLocaleString()}</Table.Cell>

                      <Table.Cell className="capitalize">{history?productId?.name}</Table.Cell>

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

  )
}
