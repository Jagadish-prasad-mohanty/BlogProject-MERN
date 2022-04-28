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

        users=await User.find();
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

        checkUser=await User.find({email:email});
    }catch(err){
        const error= new HttpError("Something went wrong!!",500);
        return next(error);
    }
    console.log(checkUser)
    if (!checkUser || checkUser.length===0){
        const newUser={
            name,
            email,
            password,
            image:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8MHx8&w=1000&q=80"
        };

        const user= new User(newUser);
        try{
            await user.save()
        }catch(err){
            const error= new HttpError("Something went wrong, Unable to save record.",500)
            return next(error);
        }
        return res.status(200).json({user:user.toObject({getters:true})});
    
    }else{

        const err= new HttpError("User already exist",422);
        next(err);
    }
    
}
const postLogInUser= async (req,res,next)=>{
    const {email,password}= req.body;
    let checkUser;
    try{
        checkUser=await User.find({email:email});
    }catch(err){
        const error= new HttpError("Something went wrong!!",500);
        return next(error);
    }
    console.log(checkUser[0])
    if (checkUser && checkUser.length){
        const currentUser=checkUser[0];
        if ( currentUser.password===password)
        return res.status(200).json({message:"User logged in successfully"});
        

    }
        const err= new HttpError("Wrong emailid or password",404);
        next(err);
    
}

exports.getUsers= getUsers;
exports.postSignUpUser= postSignUpUser;
exports.postLogInUser= postLogInUser;