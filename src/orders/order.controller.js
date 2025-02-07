const Order= require('./order.model')

const createOrder=async(req,res)=>{
    try{
        const newOrder = await Order(req.body);
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder)

    }catch(error){
        console.error("error in creating order",error)
        res.status(500).json({message: "failed to create order"});
}
}

const getOrderByEmail=async(req,res)=>{
    try{
        const {email}=req.params;
        const orders=await Order.find({email}).sort({createdAt: -1})
        if(!orders){
            return res.status(404).send({message:"order not found"})
        }
        res.status(200).json(orders)

    }catch(error){
        console.error("error in fetching order",error)
        res.status(500).json({message: "failed to fetch order"});
    }
}

module.exports = {createOrder,getOrderByEmail}