const express=require("express");
const router=express.Router();

const bcrypt=require("bcryptjs");
const User=require("../models/User");
router.post("/signup",async (req,res)=>{
    try{
    const {name,email,password,role}=req.body;
    const checkEmail=await User.findOne({email});
      if(checkEmail){
        return res.send("user already there");
    }
    const hashpassword=await bcrypt.hash(password,10);
    const newUser=await User.create({name,email,password:hashpassword,role});
  
    if(newUser){
        res.status(201).json({message:"User created"});
    }
}
catch(err){
    res.status(500).json({message:err.message});
}
})
module.exports=router;