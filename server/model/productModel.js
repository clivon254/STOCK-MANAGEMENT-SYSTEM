

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{type:String , required:true},

    unit:{type:String , required:true},

    quantity:{type:Number , required:true},

    limit:{type:String , required:true},

    initialQuantity:{type:String }

},{timestamps:true})


const Product = mongoose.model('Product', productSchema)


export default Product ;