const Cart = require("../schema/cart.schema");
const Product = require("../schema/product.schema");
const addToCart = async (req, res) => {
   try {
      const  userId  = req.user._id;
      const { productId, quantity } = req.body;
      const productInfo = await Product.findById(productId);
      if (!productInfo) {
         return res.status(400).send("product are not found")
      }
      const pricePerQunatity = productInfo.perPriceQuantity;
      const price = quantity * pricePerQunatity;
      let cart = await Cart.findOne({user:userId});
      if (!cart) {
         cart = new Cart({
            user: userId,
            products: [],
            totalAmonut: 0
         })
      }
      const productExistIndex = cart.products.findIndex((item) => item.product.equals(productId))
      if (productExistIndex > -1) {
         cart.products[productExistIndex].quantity = quantity;
         cart.products[productExistIndex].price = price
      } else {
         cart.products.push({ product: productId, price, quantity })
      }
      const totalAmonut = cart.products.reduce((total, item) => total + item.price, 0)
      const cartInfo = await cart.save();
      return res.status(500).json({ cartInfo ,totalAmonut})
   } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message)
   }
}
const getUsreCart = async (req, res) => {
   try {
      const userId = req.user._id;
      const cart = await Cart.findOne({ user: userId }).populate("products.product");
      const totalAmount = cart.products.reduce((total, item) => total + item.price, 0);
      return res.status(200).json({ cart, totalAmount });
   } catch (error) {
       console.log(error.message);
       return res.status(500).json(error.message)
   }
}
const removeCart = async (req, res) => {
   try {
      const userId = req.user._id;
      const { productId } = req.params;
      const cartInfo = await Cart.findOne({ user:userId});
     if (!cartInfo) {
        return res.status(400).json("cart are not found")
     }     
     const price =  cartInfo.products.find(item => item.product==productId).price;
     const data = await Cart.findOneAndUpdate({user:userId},{
      $pull:{products:{product:productId}},
      $inc:{totalAmonut:-price}
   },
   {returnDocument:"after"});
   return res.status(200).json(data)
   } catch (error) {
       console.log(error);
       return res.status(500).json(error.message)
   }
}
module.exports = {
    addToCart,
    getUsreCart,
    removeCart
}