const express=require("express");
const jwt=require("jsonwebtoken");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
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
    const accessSignUpToken=jwt.sign({userid:newUser._id},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"});
    const refreshToken=jwt.sign({userid:newUser._id},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:24*60*60*7*1000
    })
    if(newUser){
       return res.status(201).json({message:"User created",accessToken:accessSignUpToken});
    }
}
catch(err){
    res.status(500).json({message:err.message});
}
})
router.post("/login",async(req,res)=>{
   
    try{
    const {email,password}=req.body;
    const findemailforlogin=await User.findOne({email});

    if(findemailforlogin){
        const comparepassword=await bcrypt.compare(password,findemailforlogin.password);
    if(comparepassword){
        const accessToken=jwt.sign({userid:findemailforlogin._id},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"});
        const refreshToken=jwt.sign({userid:findemailforlogin._id},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
        res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000
});
        return res.status(200).json({message:"user have an account with this password and access token created",accessToken:accessToken});
    }
     else{
        return   res.status(401).json({message:"wrong password"});
    }
      
    }
    else{
       return res.status(404).json({message:"user doesnt have an account with this email"});
    }
   
}catch(err){
    return res.status(500).json({message:err.message});
}
   
})
router.post("/refresh",async(req,res)=>{
const cookie=req.cookies.refreshToken;
if(!cookie){
    return res.status(401).json({message:"cookie doesnt exist"});
}
try{
const verification=jwt.verify(cookie,process.env.JWT_REFRESH_SECRET);
// jwt.verify() does two things: (1) confirms the token is legit/not expired, and (2) decodes and returns that same original payload object you embedded back at login — the exact same { userid: "..." } shape, just handed back to you now.
const userid=verification.userid;
const newaccessToken=jwt.sign({userid:userid},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"});

if(verification){
    return res.status(200).json({message:"new access token created",accessToken:newaccessToken});
}
}catch(err){
     return res.status(500).json({message:err.message});
}
})
router.get("/me",authMiddleware,async(req,res)=>{
      return  res.status(200).json({message:"you are authenticated",userid:req.userid});
})
router.post("/logout",(req,res)=>{
    res.clearCookie('refreshToken', {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  
})
return res.status(200).json({message:'logged out successfully'});

});

module.exports=router;