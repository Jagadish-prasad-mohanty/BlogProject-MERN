import React, { useCallback, useReducer } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import useFormHook from "../../shared/hook/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useHttpClient from "../../shared/hook/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./NewPlace.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageUploader from "../../shared/components/UIElements/ImageUploader";


const NewPlace = () => {
  const {isLoading,error,sendRequest,clearError}= useHttpClient();
  const userId=useSelector(state=>state.auth.currentUserId);
  const token=useSelector(state=>state.auth.currentToken);
  const history = useHistory();
  const {formState, inputHandler} =useFormHook({
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      placeImage:{
        value:"",
        isValid:true
      },
      description: {
        value: "",
        isValid: false,
      },
      address:{
        value: "",
        isValid: false,
      }
    },
    isFormValid: false,
  });

  const onCreatePlace= async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    ///simple append the required json data,
    // key as 1st arg and value as 2nd arg in the .append()
    // formState is used to manage the state 
    formData.append("title",formState.inputs.title.value);
    formData.append("placeImage",formState.inputs.placeImage.value);
    formData.append("description",formState.inputs.description.value);
    formData.append("address",formState.inputs.address.value);
    formData.append("creator",userId);

    try{
      await sendRequest(process.env.REACT_APP_BACKEND_URL+"/places",
      "POST",
      formData,
      {
        Authorization:"Bearer "+token
      }
      )
      history.push(`/${userId}/places`);
    }catch(err){}

  }
  if (isLoading){
    return <div className="center">
      <LoadingSpinner/>
    </div>
  }
  
  
  return (
    <>
    <ErrorModal error={error}
      onClear={clearError}
    />
    <form className="form" onSubmit={onCreatePlace}>
      <Input
        type="text"
        errorMsg="Please enter a valid Place Name"
        id="title"
        placeholder="title"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      >
        Title :
      </Input>
      <ImageUploader id="placeImage" onInput={inputHandler}/>
      <Input
        element="textarea"
        errorMsg="Please enter a valid Description(at least 5 characters)"
        id="description"
        placeholder="description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
      >
        Description :
      </Input>

      

      <Input
        errorMsg="Please enter a valid Description(at least 5 characters)"
        id="address"
        placeholder="address"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      >
        Address :
      </Input>
      <Button type="submit" disabled={!formState.isFormValid}>
        Add Place
      </Button>
    </form>
    </>
  );
};

export default NewPlace;
