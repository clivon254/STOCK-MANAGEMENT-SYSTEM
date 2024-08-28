
import History from "../model/historyModel.js";


export const getProductHistory = async (req,res,next) => {

    const {productId} = req.params ;

    try
    {
        const stockHistory = await History.find({productId})
                                         .sort({timestamp: -1})
                                         .populate({
                                            path:"productId",
                                            select:"name unit"
                                         })

        res.status(200).json({success:true ,stockHistory})
    }
    catch(error)
    {
        next() 
    }

}


export const getAllStockHistory = async (req,res,next) => {

    try
    {
        const stockHistory = await History.find({})
                                         .sort({timestamp: -1})
                                         .populate({
                                            path:"productId",
                                            select:"name unit"
                                         })

        res.status(200).json({success:true ,stockHistory})
    }
    catch(error)
    {
        next()
    }

}