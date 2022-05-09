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


const NewPlace = () => {
  const {isLoading,error,sendRequest,clearError}= useHttpClient();
  const userId=useSelector(state=>state.auth.currentUserId);
  const history = useHistory();
  const {formState, inputHandler} =useFormHook({
    inputs: {
      title: {
        value: "",
        isValid: false,
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
    try{
      await sendRequest("http://localhost:5000/api/places",
      "POST",
      JSON.stringify({
        title:formState.inputs.title.value,
        description:formState.inputs.description.value,
        address:formState.inputs.address.value,
        creator:userId
      }),
      {
        "Content-type":"application/json"
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
        Description :
      </Input>
      <Button type="submit" disabled={!formState.isFormValid}>
        Add Place
      </Button>
    </form>
    </>
  );
};

export default NewPlace;
