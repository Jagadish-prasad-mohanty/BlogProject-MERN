const uuid=require("uuid/v4");
const {validationResult}=require('express-validator')
const bcrypt= require('bcryptjs');
const jwt= require("jsonwebtoken");

const User= require("../models/user");
const HttpError = require("../models/http-error");



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
    console.log(checkUser);
    if (checkUser){
        console.log("User already exist.")
        const err= new HttpError("User already exist, please login instead.",422);
        return next(err);
    }

    console.log("user-controllers.js -> filePath",req.file.path);

    let bcryptedPassword;
    try{
        bcryptedPassword= await bcrypt.hash(password,12);
    }catch(err){
        const error= new HttpError("Unable to create user, Please try again.",500);
        return next(error);
    }

    
    const newUser={
        name,
        email,
        password:bcryptedPassword,
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

    let token;
    try{
        token= jwt.sign({userId:newUser.id,email:newUser.email},
            process.env.JWT_KEY,
            {expiresIn:"1h"})
    }catch(err){
        console.log(err)
        const error= new HttpError("Something went wrong, Unable to signup.",500)
        return next(error); 
    }


    return res.status(200).json({userId:newUser.id,email:newUser.email,token:token});

    
        
    
    
}
const postLogInUser= async (req,res,next)=>{
    const {email,password}= req.body;
    let checkUser;
    try{
        checkUser=await User.findOne({email:email});
    }catch(err){
        const error= new HttpError("Loggin failed, Please try again later.",500);
        return next(error);
    }
    console.log(checkUser);
    if (!checkUser ){
        const err= new HttpError("Wrong email id or password, Could not log you in.",401);
        return next(err);
    }

    let isValidPass=false;
    try{

        isValidPass=await bcrypt.compare(password,checkUser.password)
    }catch(err){

        const error= new HttpError("Loggin failed, Please try again later.",500);
        return next(error);
    }
    if (!isValidPass){
        const err= new HttpError("Wrong email id or password, Could not log you in.",401);
        return next(err);
    }

    let token;
    try{
        token= jwt.sign({userId:checkUser.id,email:checkUser.email},
            process.env.JWT_KEY,
            {expiresIn:"1h"})
    }catch(err){
        console.log(err)
        const error= new HttpError("Something went wrong, Unable to loggedin.",500)
        return next(error); 
    }

    return res.status(200).json({message:"Logged in!",userId:checkUser.id,email:checkUser.email,token:token});
    
}

exports.getUsers= getUsers;
exports.postSignUpUser= postSignUpUser;
exports.postLogInUser= postLogInUser;