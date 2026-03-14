const User = require('../schema/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRegister = async function(req,res) {
     try {
        const {name,email,password } = req.body;
        const newUser = await User.findOne({email});
        if(newUser){
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const user = await User.create({name,email,password:hashedPassword});
        res.status(200).json({user});
     } catch (error) {
       console.log(error);
       res.status(500).json({ message: error.message});
     }
}
const loginUser = async function(req,res) {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
          if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
          user.password = undefined;
          const token = generateToken(user);
        res.status(200).json({user,token});
    } catch (error) {
       return res.status(500).json({ message: "Internal server error"});
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const generateToken = function(user){
    const userData = {_id:user._id,email:user.email,role:user.role};
    const expireTime = 60*60*24;
    const token = jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:expireTime});
    return token;
}
module.exports = {
    getAllUsers,
    userRegister,
    loginUser
}