

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{type:String , required:true},

    unit:{type:String , required:true},

    quantity:{type:Number , required:true},

    limit:{type:Number , required:true},

    initialQuantity:{type:Number }

},{timestamps:true})


const Product = mongoose.model('Product', productSchema)


export default Product ;