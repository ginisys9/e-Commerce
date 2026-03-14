const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            maxlength:50,
            trim:true
        },
        image:{
            type:String,
            trim:true,
            default:null
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        },
        perPriceQuantity:{
            type:Number,
            required:true,
            default:0
        },
        description:{
            type:String,
            maxlength:200,
            trim:true
        }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)