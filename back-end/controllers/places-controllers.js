const uuid=require('uuid/v4');
const {validationResult}=require('express-validator');

const Place= require("../models/place");
const HttpError= require('../models/http-error');
const findGeoCode = require('../util/location');

let DEMO_PLACES=[
    {
        id:'p2',
        title:'Lingaraja Temple',
        address:'Lingaraj Ample, Lingaraj Temple Rd, Old Town, Bhubaneswar, Odisha 751002',
        imageURL:"https://lh5.googleusercontent.com/p/AF1QipMIQe3sxO0i4GxrzhEAtD6t9ihVTvoGeXJo2gCJ=w408-h272-k-no",
        description:"One of tge most famous temple of india",
        location:{
            lat:20.238299,
            lng:85.8315642
        },
        creator:"u1",
    },
    {
        id:'p1',
        title:'Jagarnath Temple',
        address:'WMRF+C89, Odisha 752014',
        description:"One of tge most famous temple of india",
        imageURL:"https://upload.wikimedia.org/wikipedia/commons/8/82/%E0%AC%9C%E0%AC%97%E0%AC%A8%E0%AD%8D%E0%AC%A8%E0%AC%BE%E0%AC%A5_%E0%AC%AE%E0%AC%A8%E0%AD%8D%E0%AC%A6%E0%AC%BF%E0%AC%B0%2C_%E0%AC%B9%E0%AC%BE%E0%AC%87%E0%AC%A6%E0%AD%8D%E0%AC%B0%E0%AC%BE%E0%AC%AC%E0%AC%BE%E0%AC%A6.jpg",
        location:{
            lat:19.8048196,
            lng:85.8157301
        },
        creator:"u1",
    },
    
]

const getPlaceById=async (req,res,next)=>{
    console.log("Get place request from places.");
    const placeId=req.params.pid;
    let place;
    try{
        
        place=await Place.findById(placeId);
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to find the requested place",500)
        return next(error);
    }
    if(!place){
        const error= new HttpError("Could not find the place",404);
        return next(error);
    }
    res.json({place:place.toObject({getters:true})});
}
const patchUpdatePlaceById=async (req,res,next)=>{
    const error=validationResult(req);
    if (!error.isEmpty()){
        console.log("place-controllers.js] error : ",error);
        const err=new HttpError("Please add valid inputs.",422)
        return next(err);
    }
    console.log("Patch place request from places.");
    const placeId=req.params.pid;
    const {title,description}= req.body;
    let place;
    try{
        place=await Place.findById(placeId);
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to find the requested place.",500);
        next(error);
    }
    if(!place){
        const error= new HttpError("Could not find the place",404);
        return next(error);
    }
    
    if (title)
        place.title=title;
    if (description)
        place.description=description;
    
    try{
       await place.save()
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to save record.")
        return next(error);
    }
    res.status(200).json({place:place.toObject({getters:true})});
}
const patchDeletePlaceById=async (req,res,next)=>{
    console.log("Delete place request from places.");
    const placeId=req.params.pid;
    let place;

    try{
        place= await Place.deleteOne({_id:placeId});
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to delete record.");
        return next(error)
    }
    res.status(200).json({message:"Deletion Done"});
}

const getPlacesByUserId= async (req,res,next)=>{
    console.log("Get user places request from places.");
    const userId=req.params.uid;
    let userPlaces;
    try{

        userPlaces=await Place.find({creator:userId}).exec();
    }catch(err){
        const error= new HttpError("Something went Wrong, couldn't find user");
        return next(error)
    }
    if(userPlaces.length===0){
        const error=new HttpError("Could not find the place posted by the user",404);
        return next(error);
    }
    res.json({userPlace:userPlaces.map(place=>place.toObject({getters:true}))});
}

const postCreatePlace=async(req,res,next)=>{

    console.log("Post create place request from places.");
    const error=validationResult(req);
    if (!error.isEmpty()){
        console.log("place-controllers.js] error : ",error);
        const err=new HttpError("Please add valid inputs.",422)
        return next(err);
    }
    const {title,address,description,creator}= req.body;
    let coordinates;
    let newPlace;
    findGeoCode(address).then(async data=>{
        console.log("[places-controllers.js] -> coordinate",data)
        coordinates=data
        
         newPlace={
            title,
            address,
            location:{
                lat:coordinates[0],
                lng:coordinates[0]
            },
            image:"https://lh5.googleusercontent.com/p/AF1QipMIQe3sxO0i4GxrzhEAtD6t9ihVTvoGeXJo2gCJ=w408-h272-k-no",
            description,
            creator
        };
        const place=new Place(newPlace);
        try{
            await place.save();
        }catch(err){
            const error=new HttpError("Could not able to create place, Try again!!",404);
            // next(error);
        }
        res.status(201).json({place:place});
    });
    // console.log("[places-controllers.js] -> coordinate",coordinates)
    

    
}

exports.getPlaceById=getPlaceById;
exports.patchUpdatePlaceById=patchUpdatePlaceById;
exports.patchDeletePlaceById=patchDeletePlaceById;
exports.getPlacesByUserId=getPlacesByUserId;
exports.postCreatePlace=postCreatePlace;