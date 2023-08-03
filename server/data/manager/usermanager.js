const { users} = require("../model/userModel");
const decodedtoken=require("../../authcheck/authcheck");
const findEmail = (email)=>{
    return new Promise((resolve, reject) => {
        users.findOne({email}).then((data)=>resolve(data))
    })
}

const InsertData = async(prev,next) => {
  const email = prev.email
  const data = await findEmail(email)
  const {password} = data
  console.log("pass",password)
  return new Promise((resolve, reject) => {
    debugger
    const fieldname = Array.from(next)    
    users.findOneAndReplace({"email":prev.email},{email,password,"fieldname":fieldname})
      .then(data => {
        resolve(JSON.parse(JSON.stringify(data)));
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
module.exports={InsertData}

