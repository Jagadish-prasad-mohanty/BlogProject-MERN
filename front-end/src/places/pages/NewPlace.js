import React, { useCallback, useReducer } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';

const formReducer=(state,action)=>{

  switch(action.type){
    case "INPUT_CHANGE":
      let isFormValid=true;
      for(let input in state.inputs){
        if (input=== action.inputId){
          isFormValid=isFormValid && action.isValid;
        }else{
          isFormValid=isFormValid && state.inputs[action.inputId].isValid;
        }
      }
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.inputId]:{
            value:action.value,
            isValid:action.isValid
          }
        },
        isFormValid:isFormValid
      }
    default:
      return state;
  }
}

const NewPlace = () => {
  const [fromState,dispatch]=useReducer(formReducer,
    {
      inputs:{
        title:{
          value:"",
          isValid:false,
        },
        description:{
          value:"",
          isValid:false,
        }
      },
      isFormValid:false
    });
  const inputHandler=useCallback((value,isValid,id)=>{
    dispatch({type:"INPUT_CHANGE",value,isValid,inputId:id})
  },[])
  const onFormSubmitHandler=(e)=>{
    e.preventDefault();
    console.log(fromState);
  }
  return <form className='form' onSubmit={onFormSubmitHandler}>
    <Input type='text'  errorMsg="Please enter a valid Place Name" id="title" placeholder="title" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]}>Title :</Input>
    <Input element='textarea' errorMsg="Please enter a valid Description(at least 5 characters)" id="description" placeholder="description" onInput={inputHandler} validators={[VALIDATOR_MINLENGTH(5)]} >Description :</Input>
    <Button type='submit'>Add Place</Button>
  </form>
};

export default NewPlace;