import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {useSelector} from 'react-redux';

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useFormHook from "../../shared/hook/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useHttpClient from "../../shared/hook/http-hook";

import "./NewPlace.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const DEMO_PLACES = [
  {
    id: "p2",
    title: "Lingaraja Temple",
    address:
      "Lingaraj Ample, Lingaraj Temple Rd, Old Town, Bhubaneswar, Odisha 751002",
    imageURL:
      "https://lh5.googleusercontent.com/p/AF1QipMIQe3sxO0i4GxrzhEAtD6t9ihVTvoGeXJo2gCJ=w408-h272-k-no",
    description: "One of tge most famous temple of india",
    location: {
      lat: 20.238299,
      lng: 85.8315642,
    },
    creator: "u1",
  },
  {
    id: "p1",
    title: "Jagarnath Temple",
    address: "WMRF+C89, Odisha 752014",
    description: "One of tge most famous temple of india",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/%E0%AC%9C%E0%AC%97%E0%AC%A8%E0%AD%8D%E0%AC%A8%E0%AC%BE%E0%AC%A5_%E0%AC%AE%E0%AC%A8%E0%AD%8D%E0%AC%A6%E0%AC%BF%E0%AC%B0%2C_%E0%AC%B9%E0%AC%BE%E0%AC%87%E0%AC%A6%E0%AD%8D%E0%AC%B0%E0%AC%BE%E0%AC%AC%E0%AC%BE%E0%AC%A6.jpg",
    location: {
      lat: 19.8048196,
      lng: 85.8157301,
    },
    creator: "u1",
  },
];
const UpdatePlace = () => {
  const [place,setPlace]=useState();
  const {placeId }= useParams();
  // console.log(placeId,place)
  const [loading,setLoading]= useState(true);
  const history= useHistory();
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  const token= useSelector(state=>state.auth.currentToken);

  const {formState, inputHandler,initiateForm} =useFormHook({
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      }
    },
    isFormValid: false,
  });

  useEffect(()=>{
    sendRequest(`http://localhost:5000/api/places/${placeId}`).then(responseData=>{
      setPlace(responseData.place);
    })
  },[placeId])
  useEffect(()=>{
    
    if (place){
    initiateForm({
      title: {
        value: place.title,
        isValid: true,
      },
      description: {
        value: place.description,
        isValid: true,
      }
    },true)
    setLoading(false);
  }
  },[place,initiateForm]);
  if (!place) {
    console.log("place",place)
    return <div className="center">
    <Card>
      Place not Found!
    </Card>
    </div>;
  }
  const updatePlaceHandler=(e)=>{
    e.preventDefault();
    sendRequest(`http://localhost:5000/api/places/${placeId}`,
      "PATCH",
      JSON.stringify({
        title:formState.inputs.title.value,
        description:formState.inputs.description.value
      }),
      {
        "Content-Type":"application/json",
        Authorization:"Bearer "+ token
      }
    ).then(responseData=>{
      history.push('/');
      console.log(responseData);
    })
    
  }

  if (loading || isLoading){
    return <div className="center">
      <LoadingSpinner/>
    </div>;
  }
  return (
    <>
    <ErrorModal error={error}
      onClear={clearError}
    />
    <form className="form" onSubmit={updatePlaceHandler}>
      <Input
        type="text"
        errorMsg="Please enter a valid Place Name"
        id="title"
        placeholder="title"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      >
        Title :
      </Input>
      <Input
        element="textarea"
        errorMsg="Please enter a valid Description(at least 5 characters)"
        id="description"
        placeholder="description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      >
        Description :
      </Input>
      <Button type="submit" 
      disabled={!formState.isFormValid}
      >
        Add Place
      </Button>
    </form>
    </>

  );
};

export default UpdatePlace;
