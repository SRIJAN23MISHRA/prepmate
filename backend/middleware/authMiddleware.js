const express=require("express");
const jwt=require("jsonwebtoken");
const router=express.Router();
const authMiddleware=(req,res,next)=>{
const getToken=req.headers.authorization;
const removeBearer=getToken.split(" ")[1];

if(!removeBearer){
    return res.status(401).json({message:"the token doesnt exist"});
}
try{
const verification=jwt.verify(removeBearer,process.env.JWT_ACCESS_SECRET);
 req.userid=verification.userid;
next();

}catch(err){
   return res.status(500).json({message:err.message});
}
}
module.exports=authMiddleware;