const mongoose = require("mongoose")



  const userSchema = new mongoose.Schema({
  name:{type:String,
  required:true,
  maxlength:32,
  trim:true},

  lastname:{
      type:String,
      maxlength:32,
     trim:true
  },
  email:{
      type:String,
      required:true,
      trim:true,
      unique:true
  }
} , {timestamps:true});

  module.exports=mongoose.model("User",userSchema)