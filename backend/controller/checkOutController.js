const Cart = require("../schema/cart.schema");
const Order = require("../schema/order.schema");
const initialCheckOut = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartInfo = await Cart.findOne({user:userId});
        const product = cartInfo.products;
        const amount = cartInfo.totalAmount;
        const{paymentType,firstName,lastName,permanentAddress,temporaryAddress,city,state,pinCode} = req.body;   
        const orderId = await Order.create({user:userId,product,amount,paymentType,firstName,lastName,permanentAddress,temporaryAddress,city,state,pinCode});
        return res.status(200).json(orderId._id);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}
const confirmCheckOut = async (req, res) => {
    try {
        const {_id:userId} = req.user._id;
        const {orderId} = req.params;
        const orderInfo = await Order.findOne({user:userId,_id:orderId,status:"initiated"});
        if (!orderInfo) {
            return res.status(400).json("order are not found")  
        }
        const cartInfo = await Cart.findOne({user:userId});
        if (!cartInfo) {
            return res.status(400).json("cart are not found")    
        }
        await Order.findOneAndUpdate({_id:orderId},{status:"pending"});
        await Cart.findOneAndDelete({user:userId});
        return res.status(200).json({message:"order placed successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}
module.exports = {
    initialCheckOut,
    confirmCheckOut
}