import History from "../model/historyModel.js";
import Product from "../model/productModel.js";
import { errorHandler } from "../utils/error.js";



export const addStock = async (req,res,next) => {

    const {name,unit,quantity,limit} = req.body ;

    const product = new Product({
        name,
        unit,
        quantity,
        limit,
        initialQuantity:quantity
    })

    const history = new History({

        productId:product._id,
    
        quantity:product.quantity,
        
        totalQuantity:product.quantity,
        
        type:'add',

        timestamp:new Date()

    })

    try
    {
        await product.save()

        await history.save()

        res.status(201).json({success:true , product})
    }
    catch(err)
    {
        next(err)
    }
}


export const useProduct = async (req,res,next) => {

    const {amount } = req.body ;

    try
    {
        const product = await Product.findById(req.params.productId)

        if(!product)
        {
            return errorHandler(404,"Product not found")
        }

         // if enough stock is available
         if(amount > product.quantity)
        {
            return next(errorHandler(401,"Not enough stock available"))
        }

        // convert amto to same unit as product
        // let convertedAmount ;

        // if(unit === product.unit)
        // {
        //     convertedAmount = amount
        // }
        // else if(unit === 'Kg' && product.unit === 'g')
        // {
        //     convertedAmount = amount * 1000
        // }
        // else if(unit === 'g' && product.unit === 'kg')
        // {
        //     convertedAmount = amount/1000
        // }
        // else if(unit === 'liters' && product.unit === 'ml')
        // {
        //     convertedAmount = amount * 1000
        // }
        // else if(unit === 'ml' && product.unit === 'kg')
        // {
        //     convertedAmount = amount/1000
        // }

        product.quantity -= amount ;

        const history = new History({

            productId:product._id,
    
            quantity:amount,
            
            totalQuantity:product.quantity,
            
            type:"taken for use",

            timestamp:new Date()

        })

        await product.save()

        await history.save()

        res.status(200).json({success:true,product , message:`Product used successfully.Remaining quantity:${product.quantity} ${product.unit}`})

    }
    catch(error)
    {
        next(error)

        console.log(error.message)
    }
}


export const deleteProduct = async (req,res,next) => {

    const id = req.params.id 

    try
    {
        await Product.findByIdAndDelete(id)

        res.status(201).json({success:true ,message:"product deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }
} 


export const updateProduct = async (req,res,next) => {

    const id = req.params.id ;

    const {quantity,name,unit,initialQuantity} = req.body 

    try
    {
        const product = await Product.findByIdAndUpdate(id,
            {$set:
                {
                 quantity,
                 name,
                 unit,
                 initialQuantity
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,product})
    }
    catch(error)
    {
        next(error)
    }

}


export const getStock = async (req,res,next) => {

    try
    {
        const products = await Product.find({})

        res.status(200).json({success:true , products})
    }
    catch(error)
    {
        next(error)
    }

}


export const getProduct = async (req,res,next) => {

    const id = req.params.id ;

    try
    {
        const product = await Product.findById(id)

        if(!product)
        {
            return next(errorHandler(401, "product not found"))
        }

        res.json({success:true , product})
    }
    catch(error)
    {
        next(error)
    }

}


export const restockProduct = async (req,res,next) => {

    const { restockQuantity} = req.body ;

    try
    {
        const product = await Product.findById(req.params.productId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        // update initialQuantity
        product.initialQuantity = restockQuantity;

        // update quantity to current quantity
        product.quantity += restockQuantity


        const history = new History({

            productId:product._id,
    
            quantity:restockQuantity,
            
            totalQuantity:product.quantity,
            
            type:"restock",

            timestamp:new Date()
        })

        await product.save()

        await history.save()

        res.json({success:true ,product})
    }
    catch(error)
    {
        next(error)
    }

}
