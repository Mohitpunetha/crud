require("dotenv").config()
const mongoose=require("mongoose")
const url=process.env.ConnectionString;
const host=process.env.host
// const db=async()=>{
//     try{
//         const con=await mongoose.connect(url)
//         console.log(`connection created: ${con.connection.host}`)
//     }
//     catch(err){
//         console.error("Cannot connect the database",err)
//     }
// }
mongoose.connect(url)
console.log("Connected======>")

// module.exports=db;
