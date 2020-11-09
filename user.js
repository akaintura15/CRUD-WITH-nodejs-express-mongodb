const User = require("../models/user")//importing user model
const { validationResult} = require('express-validator');


//this is middleware and we will not use it directly

exports.getUserById=(req,res,next,id)=>{//this is param    
    User.findById(id).exec((err,user)=>{//putting the User to work
if(err || !user){
    return res.status(400).json({
        error:"Cannot found User in DB"
    })
}
   req.profile=user //creating a object profile in request and saving user there
   next();
    })
};

//create user with validation controller
exports.signup=(req,res)=>{
    const errors=validationResult(req)//validation result
        if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg //created errors into array to use it
        })
    }

   const user= new User(req.body)//creating new object of user and giving in the user
   user.save((err,user)=>{
  if(err){
      return res.status(400).json({
          err:"Not able to save user in Database"
      })
  }
 // res.json(user); instead of this show selective info
 res.json({name:user.name,lastname:user.lastname,
 email:user.email,id:user._id});
   })
};

//read single user controller
exports.getUser=(req,res)=>{
    req.profile
    return res.json(req.profile)
};

//read all users controller
exports.getAllUsers=(req,res)=>{
    User.find().exec((err,user)=>{
if(err){
    return res.status(400).json({
        error:"No users found "
    })
}
res.json(user);
    })
};
//update controller
exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"Not updated !"
                                            })
                   }
            res.json(user)
             }
                        )};
                        
//delete controller
exports.deleteUser=(req,res)=>{
  let del=req.profile;
  del.remove((err,deleteduser)=>{
      if(err){
          return res.status(400).json({
              error:"Failed to delete"
                                      })
             }
      res.json({
          message:"deletion successfull",deleteduser
               })
                                })
    };
