const HttpError = require("../models/http-error");
const uuid=require("uuid/v4");
const {validationResult}=require('express-validator')

const DEMO_USERS=[
    {
        id:"u1",
        name:"Jagadish Mohanty",
        email:"mohantyjagadihs@gmail.com",
        password:"123456"
    }
]

const getUsers= (req,res,next)=>{
    res.status(200).json({users:DEMO_USERS});
}

const postSignUpUser= (req,res,next)=>{
    const error= validationResult(req);
    if (!error.isEmpty()){
        console.log("user-controllers.js] error : ",error);
        const err=new HttpError("Please add valid user inputs.",422)
        return next(err);
    }
    const {name,email,password}= req.body;
    const checkUser=DEMO_USERS.find(item=>item.email===email);
    if (!checkUser){
        const newUser={
            id:uuid(),
            name,
            email,
            password
        };

    DEMO_USERS.push(newUser);
    return res.status(200).json({user:newUser})
    
    }
        const err= new HttpError("User already exist",422);
        next(err)
    
}
const postLogInUser= (req,res,next)=>{
    const {email,password}= req.body;
    const checkUser=DEMO_USERS.find(user=>user.email===email);
    if (checkUser && checkUser.password===password){
        return res.status(200).json({message:"User logged in successfully"});

    }
    const err= new HttpError("Wrong emailid or password",404);
    next(err);
}

exports.getUsers= getUsers;
exports.postSignUpUser= postSignUpUser;
exports.postLogInUser= postLogInUser;