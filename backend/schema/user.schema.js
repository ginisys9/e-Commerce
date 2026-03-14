const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        trim:true
    },
    email: {
        type: String,
        required: true,
        maxLength:24,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber:{
        type: String,
        maxLength:10,
        trim:true,
        default:null
    },
    role:{
        type: String,
        default:0 // 0 for user 1 for admin
    },
    photos:{
        type:String,
        default:null
    }
},{timestamps:true});
module.exports = mongoose.model("User", userSchema);