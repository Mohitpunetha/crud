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


