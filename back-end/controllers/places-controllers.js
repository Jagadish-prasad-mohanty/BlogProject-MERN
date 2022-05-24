const {validationResult}=require('express-validator');
const mongoose = require('mongoose');


const Place= require("../models/place");
const User= require("../models/user");
const HttpError= require('../models/http-error');
const findGeoCode = require('../util/location');


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
        place= await Place.findById(placeId).populate('creator');
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to delete the place1.");
        return next(error)
    }
    if (!place){
        const error= new HttpError("Something went wrong, Unable to find the place.");
        return next(error);
    }
    console.log("place : ",place);
    // let user;
    // try{
    //     user= await User.findById(place.creator);
    // }catch(err){
    //     const error= new HttpError("Something went wrong, Unable to delete the place2.");
    //     return next(error)
    // }
    // if (!user){
       
    //         const error= new HttpError("Something went wrong, Unable to find the creator.");
    //         return next(error) 
    // }
    try{
        const sess=await mongoose.startSession(); // Create sesssion
        sess.startTransaction();  // start transaction
        await Place.deleteOne(place);  // Task-1
        place.creator.places.remove(place);  // Task-2
        await place.creator.save({session:sess});  // Task-3
        await sess.commitTransaction();  // Commit all the changes
    }catch(err){
        // console.log(err);
        const error= new HttpError("Something went wrong, Unable to delete place3.");
        // Rather than using throw Error use next(error)
        // as it is a async task
        return next(error); 
    }
    res.status(200).json({message:"Deletion Done"});
}

const getPlacesByUserId= async (req,res,next)=>{
    console.log("Get user places request from places.");
    const userId=req.params.uid;
    let userWithPlaces;
    try{
        userWithPlaces=await User.findById(userId).populate("places");
    }catch(err){
        const error= new HttpError("Something went Wrong, couldn't find user");
        return next(error)
    }
    // if(!userWithPlaces || userWithPlaces.places.length===0){
    //     const error=new HttpError("Could not find the place posted by the user",404);
    //     return next(error);
    // }
    res.json({userPlace:userWithPlaces.places.map(place=>place.toObject({getters:true}))});
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
    let user;
    try{
        user=await User.findOne({"_id":creator});
    }catch(err){
        const error= new HttpError("Something went wrong, Unable to create place",500);
        return next(error);
    }
    if (!user){
        // console.log(err);
        const error= new HttpError("Something went wrong, Unable to find the User.",404);
        return next(error);
    }
    console.log(user);
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
            image:req.file.path,
            description,
            creator
        };
        const place=new Place(newPlace);
        try{
            const sess=await mongoose.startSession();
            sess.startTransaction();
            await place.save({session:sess})
            user.places.push(place);
            await user.save({session:sess});
            await sess.commitTransaction()
        }catch(err){
            console.log(err)
            const error=new HttpError("Could not able to create place, Try again!!",404);
            return next(error);
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