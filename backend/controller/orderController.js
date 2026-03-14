const Order = require("../schema/order.schema");

const getAllOrders = async (req, res) => {
    try {
        const {limit=10,offset=1} = req.query;
        const skip = (offset - 1) * limit; 
        const orders = await Order.find().populate('user','name email').populate('products.product',).skip(skip).limit(limit).sort({createdAt:-1,updatedAt:-1});
        return res.status(200).json({
        orders,
        pagination: {
            total: orders.length,
            limit,
            offset
        }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}
const userOrder = async (req, res) => {
    try {
         const userId = req.user._id;
         const {limit=10,offset=1} = req.query;
         const skip = (offset - 1) * limit; 
        const orders = await Order.find({user:userId}).populate('products.product','name image').skip(skip).limit(limit).sort({createdAt:-1,updatedAt:-1});
        return res.status(200).json({
        orders,
        pagination: {
            total: orders.length,
            limit,
            offset
        }
        });
    } catch (error) {
         console.log(error.message);
        return res.status(500).json(error.message)
    }
}
const getOrderById = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId).populate('user','name email').populate('products.product',).sort({createdAt:-1,updatedAt:-1});
        return res.status(200).json(order);
      
    } catch (error) {
         console.log(error.message);
        return res.status(500).json(error.message)
    }
}
const updateOrderStatus = async (req, res) => {
    try {
         const {orderId}= req.params;
         const orderInfo = await Order.findById(orderId);
         if (!orderInfo) {
            return res.status(400).json("order are not found")  
         }
         const {status} = req.body;
         await Order.findOneAndUpdate({_id:orderId},{status});
         return res.status(200).json({message:"order status updated successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}
module.exports = {
   getAllOrders,
   userOrder,
   getOrderById,
   updateOrderStatus
}