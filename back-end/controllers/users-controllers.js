const uuid=require("uuid/v4");
const {validationResult}=require('express-validator')

const User= require("../models/user");
const HttpError = require("../models/http-error");

const DEMO_USERS=[
    {
        id:"u1",
        name:"Jagadish Mohanty",
        email:"mohantyjagadihs@gmail.com",
        password:"123456"
    }
]

const getUsers= async (req,res,next)=>{
    let users;
    try{

        users=await User.find({},"-password");
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to find users",500);
        return next(error);
    }
    res.status(200).json({users:users.map(user=>user.toObject({getters:true}))});
}

const postSignUpUser= async (req,res,next)=>{
    const error= validationResult(req);
    if (!error.isEmpty()){
        console.log("user-controllers.js] error : ",error);
        const err=new HttpError("Please add valid user inputs.",422)
        return next(err);
    }
    const {name,email,password}= req.body;
    let checkUser;
    try{

        checkUser=await User.findOne({email:email});
    }catch(err){
        const error= new HttpError("Signup failed, Please try again later!!",500);
        return next(error);
    }
    console.log(checkUser)
    console.log("user-controllers.js -> filePath",req.file.path);

    if (!checkUser){
        const newUser={
            name,
            email,
            password,
            image:req.file.path,
            places:[]
        };

        const user= new User(newUser);
        try{
            await user.save()
        }catch(err){
            console.log(err)
            const error= new HttpError("Something went wrong, Unable to signup.",500)
            return next(error);
        }
        return res.status(200).json({user:user.toObject({getters:true})});
    
    }else{
        console.log("User already exist.")
        const err= new HttpError("User already exist, please login instead.",422);
        next(err);
    }
    
}
const postLogInUser= async (req,res,next)=>{
    const {email,password}= req.body;
    let checkUser;
    try{
        checkUser=await User.findOne({email:email});
    }catch(err){
        const error= new HttpError("Something went wrong!!",500);
        return next(error);
    }
    console.log(checkUser);
    if (checkUser && checkUser.password===password){
        return res.status(200).json({userId:checkUser.id});
    }
    const err= new HttpError("Wrong emailid or password, Could not log you in.",401);
    next(err);
    
}

exports.getUsers= getUsers;
exports.postSignUpUser= postSignUpUser;
exports.postLogInUser= postLogInUser;