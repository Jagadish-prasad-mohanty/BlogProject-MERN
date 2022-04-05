import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import useFormHook from "../../shared/hook/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./NewPlace.css";

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
  const [isLoading,setIsLoading]=useState(true);
  const {placeId }= useParams();
  console.log(placeId)
  
  const [formState, inputHandler,onFormSubmitHandler,initiateForm] =useFormHook({
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

  const identifiedPlace = DEMO_PLACES.find((place) => place.id === placeId);
  useEffect(()=>{
    if (identifiedPlace){
    initiateForm({
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      }
    },true)
    setIsLoading(false);
  }
  },[identifiedPlace,initiateForm]);
  // console.log(identifiedPlace)
  if (!identifiedPlace) {
    return <div className="center">
    <Card>
Place not Found!
    </Card>
    </div>;
  }

  if (isLoading){
    return <div style={{ textAlign: "center",color:"white" }}>Loading...</div>;
  }
  return (

    <form className="form" onSubmit={onFormSubmitHandler}>
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
  );
};

export default UpdatePlace;
