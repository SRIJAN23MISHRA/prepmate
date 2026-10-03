const express=require("express");
const route=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const Notes=require("../models/Note");
const Topic = require("../models/Topic");
route.post("/",authMiddleware,async(req,res)=>{
    try{
    const title=req.body.title;
    const content=req.body.content;
    const topic=req.body.topic; 
    const user=req.userId;
    const newOne=await Notes.create({title:title,content:content,topic:topic,user:user});
    return res.status(201).json({message:"new notes added:",newOne});
    }catch(err){
     return res.status(500).json({message:err.message});
    }
})
route.get("/",authMiddleware,async(req,res)=>{

    try{
      const getInfo=req.userId;
      const findNote=await Notes.find({user:getInfo});
      return res.status(200).json({message:"got the notes for the topic:",findNote});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
})
route.put("/:id",authMiddleware,async(req,res)=>{
    try{
    const parameter=req.params.id;
    const updateThis=await Notes.findByIdAndUpdate(parameter,req.body,{new:true});
    return res.status(200).json({message:"updated:",updateThis});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
})
route.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const deletedparameter=req.params.id;
        const deleteThis=await Notes.findByIdAndDelete(deletedparameter);
        return res.status(200).json({message:"deleted data",deleteThis});
    }catch(err){
          return res.status(500).json({message:err.message});
    }
})
module.exports=route;