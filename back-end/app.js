const express=require('express');
const bodyParser=require('body-parser');

const placesRouter=require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app=express();

app.use(bodyParser.json());
app.use("/api/places",placesRouter);
app.use((req,res,next)=>{
    const error=new HttpError("Something went Wrong",404);
    next(error);
});

app.use((error,req,res,next)=>{
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "Some unknown Error occured"})
});

app.listen(5000);
