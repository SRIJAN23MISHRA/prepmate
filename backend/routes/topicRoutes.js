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
route.get("/",authMiddleware,async(req,res)=>{
   try{
      const user=req.userId;
     const specificTopic=await Topic.find({user:user});
   return res.status(200).json({message:"specific topics are:",specificTopic});
   }catch(err){
         return res.status(500).json({message:err.message});
   }

})
route.put("/:id",authMiddleware,async(req,res)=>{
   try{
        const detail=req.params.id;
        const specificOne=await Topic.findByIdAndUpdate(detail,req.body,{new:true});
        return res.status(200).json({message:"updated data:",specificOne});
   }
   catch(err){
      return res.status(500).json({message:err.message});
   }
})
route.delete("/:id",authMiddleware,async(req,res)=>{
   try{
   const detailToBeDeleted=req.params.id;
   const specificData=await Topic.findByIdAndDelete(detailToBeDeleted);
    return res.status(200).json({message:"data deleted:",specificData});
}catch(err){
   return res.status(500).json({message:err.message});
}
})
module.exports=route;