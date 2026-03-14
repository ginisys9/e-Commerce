const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
     },
     products:[{
         product:{
             type: mongoose.Schema.Types.ObjectId,
             ref:"Product",
             required:true
         },
         quantity:{
             type:Number,
             required:true,
             default:0
         },
         price:{
             type:Number,
             required:true,
             default:0
         },
     }],
     tatalAmont:Number,
     paymentType:{
         type:String,
         enum:['COD','Online'],
         default:'COD'
     },
     firstName:{
         type:String,
         required:true,
         trim:true,
         maxLength:50
     },
     lastName:{
         type:String,
         trim:true
     },
     permanentAddress:{
         type:String,
         required:true
     },
     temporaryAddress:{
         type:String,
         default:null
     },
     city:{
         type:String,
         required:true
     },
 
     pinCode:{
         type:String,
         required:true
     },
     state:{
         type:String,
         required:true
     },
     status:{
         type:String,
         enum:["initiated",'pending',"Processing","completed","Cancelled"],
         default:"initiated"
     }
},{timestamps:true})
module.exports = mongoose.model("Order", orderSchema)