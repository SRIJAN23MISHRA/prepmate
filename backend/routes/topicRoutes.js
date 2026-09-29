const express=require("express");
const route=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const Topic=require("../models/Topic");
// const router = require("./authRoutes");
route.post("/",authMiddleware,async(req,res)=>{
    try{
       const name=req.body.name;
       const user=req.userId;
       const topic=await Topic.create({name:name,user:user});
       return res.status(201).json({message:"new topic created",topic:topic})
    }
       catch(err){
          return res.status(500).json({message:err.message});
       }
})
module.exports=route;