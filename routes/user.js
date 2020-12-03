const express=require("express")
const router=express.Router()

const { check } = require('express-validator');
const{getUserById,
    getUser,
    signup,
    getAllUsers,
    deleteUser,
    updateUser}=require("../controllers/user")

router.param("userId",getUserById)//this is gonna populate req.profile

//create (with validation to avoid garbage value)
router.post("/signup",[check("name").isLength({min:3}).withMessage('Name must be at least 3 chars long'),
check("email").isEmail().withMessage('E-mail is required')

],signup)
//read one
router.get("/user/:userId",getUser)
//read all
router.get("/users",getAllUsers)
//update
router.put("/user/:userId",updateUser)
//delete
router.delete("/user/:userId",deleteUser)

module.exports=router;

