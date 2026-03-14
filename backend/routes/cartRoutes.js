const express = require("express")
const router = express.Router();
const cartContoller = require("../controller/cartController")
const {auth} = require('../middleware/auth')
router.post('/',auth,cartContoller.addToCart)
router.get('/getcart',auth,cartContoller.getUsreCart)
router.delete('/:productId',auth,cartContoller.removeCart)  
module.exports = router