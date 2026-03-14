const express = require("express");
const router = express.Router();
const isValid = require("../middleware/validation");
const userController = require("../controller/userController");
const {auth} = require("../middleware/auth");
router.get("/",auth, userController.getAllUsers);
router.post("/", isValid.userRegister,userController.userRegister);
router.post("/loginUser",userController.loginUser);
module.exports = router;

