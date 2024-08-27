
import express from "express"
import { getAllStockHistory, getProductHistory } from "../contoller/historyController.js";

const historyRouter = express.Router()


historyRouter.get("/get-productHistory/:productId", getProductHistory)


historyRouter.get("/get-stockHistory", getAllStockHistory)


export default historyRouter ;