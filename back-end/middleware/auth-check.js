const jwt= require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req,res,next)=>{
    if (req.method==="OPTIONS"){
        next();
    }
    try{

        console.log(req.headers);
        const token= req.headers.authorization.split(' ')[1]; //{autherization: "Bearer token"}
        if (!token){
            console.log("checked")
            throw new Error("Authetication Failed!");
        }
        const decodedToken= jwt.verify(token,process.env.JWT_KEY);
        res.userData= {userId:decodedToken.userId};
        console.log("checked")
        next();
    }catch(err){
        const error= new HttpError("Authentication failed!",401);
        return next(error);
    }

}