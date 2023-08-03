 const { response } = require("express");
 const alldatas=require("../data/manager/manager")
// const upload=require("../data/manager/usermanager")
const userAlldata=require('../data/model/userModel').users
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
// const { Modal } = require("bootstrap");
const SECRET_KEY=process.env.SECRET_KEY
const nodemailer=require("nodemailer")
// console.log("skey",SECRET_KEY);
const {base64}=require("js-base64")
const { validationResult } = require('express-validator');
module.exports.getdata=async (req,res)=>{
   let userData=await alldatas.alldata()
//    let userProfile = await userManager.getUserProfile(searchQuery);
    res.status(200).json({ success: true, data: userData});
}
module.exports.insertAlldata=async (req,res)=>{
    const data =req.body;
   let UIdata= alldatas.InsertData(data)
   res.status(200).json({ success: true, data: UIdata});
}
module.exports.updatedata=(req,res)=>{
    const {pre,next} =req.body;
    let allUpdateData=alldatas.updateData(pre,next)
    res.status(200).json({ success: true, data: allUpdateData});
}
module.exports.datadelete=()=>{
    const data=req.body;
   let deletedata=alldatas.deleteData(data)
   res.status(200).json({ success: true, data: deletedata});
}
module.exports.specificData=async(req,res)=>{
    let placeData=await alldatas.alldata({"adress":"Uttarakhand"})
    res.status(200).json({ success: true, data: placeData});   
}
module.exports.genderData=async(req,res)=>{
    let genderCheck=await alldatas.alldata({"gender":"Female"})
    res.status(200).json({sucess:true,data:genderCheck})
}
module.exports.transGenderData=async(req,res)=>{
    let transData=await alldatas.alldata({"gender":"Transgender"})
    res.status(200).json({sucess:true,data:transData})
}

//query with the letter starting with [a-z] {"name":{$regex :/^a/i}}
// for ending with a letter with [a-z]{"name":{$regex:/a$/i}}
module.exports.firstNameData=async(req,res)=>{
    let namesStartingWithA = await alldatas.alldata({ "name": { $regex: /^a/i } });
    res.status(200).json({sucess:true, data:namesStartingWithA})
}

module.exports.malegender=async(req,res)=>{
    let malegender =await alldatas.alldata({"gender":"Male"})
    // console.log(malegender)
    res.status(200).json({sucess:true,data:malegender})
}
module.exports.Querydata=async(req,res)=>{
    const queryparams=req.query;
    if(queryparams){
        const filterdData=await alldatas.alldata({...queryparams})
        res.json(filterdData)
    }
    else{
        res.status(404).json({status:"Missing data"})
    }
    }

module.exports.oneupdate=async(req,res)=>{
    try{
        const data=await alldatas.updateone(
            {_id:"64ba14bb0fc71374d3fd340c"},
            { $set:{name:"annu",adress:"new Delhi",gender:"Male"}}
            );
            res.status(200).json({sucess:true,data:data})
            }catch (error) {
            res.status(500).json({ success: false, error: "wrong" });
        }    

    }


    // auth check and login page 

module.exports.showloginPage=(req,res)=>{
    res.render('login')  
}

module.exports.testpage=(req,res)=>{
    res.render('test')
}
//TODO  this findone () in useController.js
module.exports.signup=async(req,res)=>{
    // existing users Check 
    // hashed Password(to encrypt) for this we should install the library bcrypt
    // user creation 
    // Token generation
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const{email,password}=req.body
        // this in manager
        const existingUser=await userAlldata.findOne({email:email})
        if(existingUser){
         res.status(400).json({message:"User already exist"})
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const result=await userAlldata.create({
            email:email,
            password:hashedpassword,
        })
        //pre define method to generator the

        // in sign  we pass two info one is payload second is secrate 
        // const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY)
        res.status(200).json({user:result,message:"Sucessfully signed in"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"})
    }

}

module.exports.signin = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        //token time setting   
        const{email,password}=req.body
        const existingToken = req.body.token
        const existingUser=await userAlldata.findOne({email:email})
        if(!existingUser){
           return res.status(404).json({message:"User not found"})
        }
        // console.log("Stored hashed password:", existingUser.password);
        // match credential (to compare we use  the same bcrypt) compare function take two parameter
        const matchPassword=await bcrypt.compareSync(password,existingUser?.password)
        // console.log("Stored hashed password:",password);
        if(!matchPassword){
           return res.status(501).json({message:"Invalid Credential"})
        }
        else if(!existingToken)
        {
            let tokenSession = Math.floor((Date.now()  +  60 * 60 * 1000));
            // console.log("fdasfadsasdf",Date.now())
            let tokenPayload={
                user_id:{email,password},
                expiry:tokenSession
            }
            // token gernate        
            let token=jwt.sign(tokenPayload,SECRET_KEY);
            // console.log('token created----->', token)   
            if(Date.now() < tokenPayload.expiry){
                res.status(200).json({user:existingUser,token:token,Message:"loginsucessFully"}) 
            }
            
            else{
                res.json({Message:"Session expired"})
            }
        }
        else{
            res.status(200).json({Message:"loginsucessFully"})
        }

    }
    catch(err){
        console.log(err)
    }
}

    module.exports.mail=async(req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'mohitpunetha98@gmail.com',
          pass: 'rglbgvvwewklodmk'
        },
      });

    const message={
        from: '<mohitpunetha98@gmail.com>',                 // sender address
        to: "ayumi94590@ebrius.net",                       // list of receivers
        subject: "Hello ✔",                                  // Subject line
        text: "Hello Rajat Mahajan this is to inform you that this email se only for testing", // plain text body
        html: "<b>Hello worlddkhfkjhskdhfkjhsjdkfhksjdhfkjhjksd?</b>",                 // html body
        
    }
    transporter.sendMail(message)
    .then(() => {
    return res.status(200).json({ mess: "You should receive an email" });
    })
    .catch((error) => {
        console.error("Error sending email:", error);
  return res.status(500).json({ error: "Error sending email" });
    });
    }


