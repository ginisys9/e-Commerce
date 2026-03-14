const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            maxlength:50,
            trim:true
        },
        image:{
            type:String,
            trim:true,
            deafault:null
        }
},{timestamps:true})
module.exports = mongoose.model("Category",categorySchema)