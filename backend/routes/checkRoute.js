
const express = require("express")
const router = express.Router();
const checkController = require("../controller/checkOutController")
const {auth} = require("../middleware/auth")
router.post("/",auth,checkController.initialCheckOut)
router.put("/:orderId",auth,checkController.confirmCheckOut)
module.exports = router