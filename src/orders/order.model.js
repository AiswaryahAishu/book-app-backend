const mongoose = require('mongoose')

const orderSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
       city:{
        type:String,
        required:true
       },
       country:String,
       state:String,
       zipcode:String
    },
    phone:{
        type:Number,
        required:true
    },
    productId:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    }
       ],
    totalPrice:{
        type:Number,
        required:true
    }
},{
    timestamps:true  // to track the actual activity when we update anything
})

const Order=mongoose.model('Order',orderSchema);

module.exports=Order;