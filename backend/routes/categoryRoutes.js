const express = require("express")
const router = express.Router();
const categoryController = require("../controller/categoryController")  
const {adminAuth} = require("../middleware/auth")
router.get("/",categoryController.getCategoryList);
router.post("/",adminAuth,categoryController.createCategory);

module.exports = router