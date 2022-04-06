const uuid=require('uuid/v4');
const HttpError= require('../models/http-error');

const DEMO_PLACES=[
    {
        id:'p2',
        title:'Lingaraja Temple',
        address:'Lingaraj Ample, Lingaraj Temple Rd, Old Town, Bhubaneswar, Odisha 751002',
        imageURL:"https://lh5.googleusercontent.com/p/AF1QipMIQe3sxO0i4GxrzhEAtD6t9ihVTvoGeXJo2gCJ=w408-h272-k-no",
        desciption:"One of tge most famous temple of india",
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
        desciption:"One of tge most famous temple of india",
        imageURL:"https://upload.wikimedia.org/wikipedia/commons/8/82/%E0%AC%9C%E0%AC%97%E0%AC%A8%E0%AD%8D%E0%AC%A8%E0%AC%BE%E0%AC%A5_%E0%AC%AE%E0%AC%A8%E0%AD%8D%E0%AC%A6%E0%AC%BF%E0%AC%B0%2C_%E0%AC%B9%E0%AC%BE%E0%AC%87%E0%AC%A6%E0%AD%8D%E0%AC%B0%E0%AC%BE%E0%AC%AC%E0%AC%BE%E0%AC%A6.jpg",
        location:{
            lat:19.8048196,
            lng:85.8157301
        },
        creator:"u1",
    },
    
]

const getPlaceById=(req,res,next)=>{
    console.log("Get place request from places.");
    const placeId=req.params.pid;
    const place=DEMO_PLACES.find(place=>place.id===placeId);
    if(!place){
        const error= new HttpError("Could not find the place",404);
        throw error;
    }
    res.json({place:place});
}
const patchPlaceById=(req,res,next)=>{
    console.log("Get place request from places.");
    const placeId=req.params.pid;
    const {title,description}= req.body;
    const place=DEMO_PLACES.find(place=>place.id===placeId);
    if(!place){
        const error= new HttpError("Could not find the place",404);
        throw error;
    }
    const updatedPlace={...place};
    if (title)
        updatedPlace.title=title;
    if (description)
        updatedPlace.desciption=description;

    DEMO_PLACES.map(item=>{
        if (item.id===placeId){
            return updatedPlace;
        }else{
            return item;
        }
    })
    res.json({place:updatedPlace});
}

const getPlacesByUserId= (req,res,next)=>{
    console.log("Get user places request from places.");
    const userId=req.params.uid;
    const userPlaces=DEMO_PLACES.filter(place=>place.creator===userId);
    if(userPlaces.length===0){
        const error=new HttpError("Could not find the place posted by the user",404);
        return next(error);
    }
    res.json({userPlace:userPlaces});
}

const postCreatePlace=(req,res,next)=>{
    console.log("Post create place request from places.");
    const {title,address,coordinates,description,creator}= req.body;

    const newPlace={
        id:uuid(),
        title,
        address,
        location:coordinates,
        description,
        creator
    };

    DEMO_PLACES.push(newPlace)
    res.status(201).json({place:newPlace});
    
}

exports.getPlaceById=getPlaceById;
exports.patchPlaceById=patchPlaceById;
exports.getPlacesByUserId=getPlacesByUserId;
exports.postCreatePlace=postCreatePlace;