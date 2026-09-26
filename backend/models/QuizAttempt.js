const mongoose=require("mongoose");
const quizSchema=new mongoose.Schema({
   
    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note"
    },
    topic:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Topic",
         required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
   score:{
    type:Number,
    required:true
   },
   totalQuestions:{
    type:Number,
    required:true
   }
},{timestamps:true})
module.exports=mongoose.model("QuizAttempt",quizSchema);