const express = require("express")
const router = express.Router();
const productController = require("../controller/productController")
const {adminAuth} = require("../middleware/auth")
router.post("/",productController.createProduct);
router.get("/",productController.productList);
router.put("/:id",productController.editProduct);
router.get('/pdetails/:id',productController.productDetail)
module.exports = router