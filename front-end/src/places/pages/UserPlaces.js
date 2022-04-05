import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList';
const DEMO_PLACES=[
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
function UserPlaces() {
    const param=useParams();
    const [places,setPlaces]=useState(DEMO_PLACES);
    const userPlaces=places.filter(place=>place.creator===param.userId)
    const deletePlaceHandler =(placeId)=>{
        console.log("[UserPlaces.js] deletePlaceHandler", placeId);
        setPlaces(places.filter(place=>place.id!==placeId))
    }
  return (
    <PlaceList items={userPlaces} deletePlace={deletePlaceHandler}/>
  )
}

export default UserPlaces