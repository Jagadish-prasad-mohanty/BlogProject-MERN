import React, { useCallback, useReducer } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import useFormHook from "../../shared/hook/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./NewPlace.css";


const NewPlace = () => {
  const [formState, inputHandler,onFormSubmitHandler] =useFormHook({
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

  
  
  return (
    <form className="form" onSubmit={onFormSubmitHandler}>
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
  );
};

export default NewPlace;
