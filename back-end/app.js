const express=require('express');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const fs= require('fs');
const path= require('path')

const placesRouter=require('./routes/places-routes');
const usersRouter=require('./routes/users-routes');
const HttpError = require('./models/http-error');


const app=express();

app.use(bodyParser.json());

app.use('/upload/images',express.static(path.join('upload','images')));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE");
    next();
})

app.use("/api/places",placesRouter);
app.use("/api/users",usersRouter);

app.use((req,res,next)=>{
    const error=new HttpError("Could not find this route.",404);
    next(error);
});

app.use((error,req,res,next)=>{
    if (req.file){
        fs.unlink(req.file.path, (err)=>{
            console.log(err);
        })
    }
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "Some unknown Error occured"})
});

mongoose.connect("mongodb+srv://Jagadish123:Mohantym90%40@cluster0.ywlsa.mongodb.net/places?retryWrites=true&w=majority").then((response)=>{
    console.log("Connected with database successfully");
}).catch((error)=>{
    console.log("Unable to connect with database.")
});

app.listen(5000);
