const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const {auth,adminAuth} = require("../middleware/auth")
router.get('/',adminAuth,orderController.getAllOrders)
router.get('/user',auth,orderController.userOrder)
router.get('/:orderId',adminAuth,orderController.getOrderById)
router.put('/:orderId',adminAuth,orderController.updateOrderStatus)

module.exports = router;

