const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    
    username:{
        type:String
    },
    password:{
        type:String
    },
    email_password:{
        type:String
    },
    forgotmail:{
        type:String
    }
},{timestamps:true})

const User = mongoose.model("User",ModelSchema)
module.exports = User;