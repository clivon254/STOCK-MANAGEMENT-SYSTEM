

import mongoose from 'mongoose'


const historySchema = new mongoose.Schema({

    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
    
    quantity:{type:Number ,required:true},
    
    totalQuantity:{type:Number ,required:true},
    
    type:{type:String ,required:true},

    timestamp:{type:Date ,required:true}
})

const History = mongoose.model('History', historySchema)


export default History 