require("dotenv").config()
const mongoose=require("mongoose")
const url=process.env.ConnectionString;
const host=process.env.host
mongoose.connect(url)
console.log("Connected======>")

