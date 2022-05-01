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
    if (!checkUser){
        const newUser={
            name,
            email,
            password,
            image:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8MHx8&w=1000&q=80",
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
    console.log(checkUser)
    if (checkUser && checkUser.password===password){
        return res.status(200).json({message:"User logged in successfully"});
        
    }
    const err= new HttpError("Wrong emailid or password, Could not log you in.",401);
    next(err);
    
}

exports.getUsers= getUsers;
exports.postSignUpUser= postSignUpUser;
exports.postLogInUser= postLogInUser;