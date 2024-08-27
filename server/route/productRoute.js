
import express from "express"
import { addStock, deleteProduct, getProduct, getStock, restockProduct, updateProduct, useProduct } from "../contoller/productController.js";


const productRouter = express.Router()


productRouter.post('/add-product', addStock)


productRouter.post('/use-product', useProduct)


productRouter.put('/update-product/:id', updateProduct)


productRouter.delete('/delete-product/:id', deleteProduct)


productRouter.get('/get-product/:id', getProduct)


productRouter.get('/get-Stock', getStock)


productRouter.post('/restock', restockProduct)





export default productRouter ;