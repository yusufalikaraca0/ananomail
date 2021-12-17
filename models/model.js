const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    count:{
        type:Number
    },
    addr:{
        type:String
    },
    message:{
        type:String
    }

},{timestamps:true})

const Model = mongoose.model("Models",ModelSchema)
module.exports = Model;