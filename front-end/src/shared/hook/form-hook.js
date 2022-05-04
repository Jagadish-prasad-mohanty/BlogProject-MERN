import React, { useReducer,useCallback } from 'react'

const formReducer=(state,action)=>{

    switch(action.type){
      case "INPUT_CHANGE":
        let isFormValid=true;
        for(let input in state.inputs){
          console.log("[form-hook -> input]",input,action.inputId);
          if (!state.inputs[input]) {
            continue;
          }
          if (input=== action.inputId){
            console.log("[form-hook.js] : input match",input,action.isValid,action.inputId);
            isFormValid=isFormValid && action.isValid;
          }else{
            console.log("[form-hook.js] : input doesn't match",input,action.inputId,action.isValid,state);
            isFormValid=isFormValid && state.inputs[input].isValid;
          }
        }
        let inputState=undefined;
        if (state.inputs[action.inputId]){
          inputState={
            value:action.value,
            isValid:action.isValid
          }
        }
        return {
          ...state,
          inputs:{
            ...state.inputs,
            [action.inputId]:inputState
          },
          isFormValid:isFormValid
        }
      case "INITIATE_FORM":
        return {
          ...state,
          inputs:action.inputs,
          isFormValid:action.isFormValid
        }
      default:
        return state;
    }
  }
  
const useFormHook=(inputState)=>{
    const [formState,dispatch]=useReducer(formReducer,inputState);
    console.log(formState);
    const inputHandler=useCallback((value,isValid,id)=>{
        console.log("[form-hook.js] : inputHandler called",value,isValid,id);
        dispatch({type:"INPUT_CHANGE",value:value,isValid:isValid,inputId:id})
      },[])
      const onFormSubmitHandler = (e) => {
        e.preventDefault();
        console.log("[form-hook.js] formState : ",formState);
      };
      const initiateForm = useCallback((inputData,formValidity) => {
        console.log("[form-hook.js] initiateForm.");
        dispatch({type:"INITIATE_FORM",inputs:inputData,isFormValid:formValidity})
      },[]);
    return [formState,inputHandler,onFormSubmitHandler,initiateForm];
}

export default useFormHook;