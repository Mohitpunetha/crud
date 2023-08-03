const jwt = require("jsonwebtoken")

const validateToken=async(req,res)=>{
    // const token =req.body.token
    // console.log("--->",req.body)
  
    // console.log("helloo token----------->",token)

    const SECRET_KEY=process.env.SECRET_KEY
        try{
            const DecodedToken=Decoded(req,res)
            const Expiry=DecodedToken.expiry
            // const currentTime=DecodedToken.iat
            if((Date.now()) > Expiry){
                res.status(401).json({message:"Token Expires"})
            }
            else{
                res.status(200).json({message:"Token valid",decodedToken:DecodedToken})
            }
        }

        catch(err){
            console.error("adsff",err)
            res.status(401).json({expiry:true,message:"Token Expires"})
        }

    
}

const Decoded=async(req,res)=>{
    // console.log("-->",req.query)
    const token=req.query.token
    const SECRET_KEY=process.env.SECRET_KEY
    const DecodedToken= await jwt.verify(token,SECRET_KEY)
    // console.log("dectok",DecodedToken)
    return DecodedToken

}
module.exports={Decoded,validateToken}


