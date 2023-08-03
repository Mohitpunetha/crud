const mongoose=require("mongoose")
const db=require("../connection")
// const { unique } = require("next/dist/build/utils")
require("../connection")
const schema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:false
    },
    fieldname:[{
        originalname:String,
        mimetype:String,
        filename:String,
        path:String,
        size:Number
    }]

},{versionKey:false})
const users=mongoose.model("Newuserchek",schema)
module.exports={
    users
}