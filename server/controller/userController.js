// const alldata=require("../data/manager/usermanager")

// module.exports.getData=async(req,res)=>{
//     let tokendata=await alldata.findData()
//     res.status(200).json({sucess:true,data:tokendata})
// }
const {Decoded}=require("../authcheck/authcheck")
const alldata=require("../data/manager/usermanager")
module.exports.insertdata=async (req,res)=>{
    debugger
    const token=await Decoded(req,res)
    // console.log("<----",token.user_id.email)
    const email =token.user_id.email;
    const password=token.user_id.password;
    const data =req.files;
    const UIdata= await alldata.InsertData({email,password},data)
   res.status(200).json({ success: true, data: UIdata});
}


// module.exports.uploadManyPics=async(req,res)=>{
//     const data=req.files
//     console.log("images",data)
//     // const getData=await alldata.InsertManyData(data)
//     // console.log("dfghysdfghyudfghj",getData)
//     // res.status(200).json({sucess:true,data:getData})
// }

