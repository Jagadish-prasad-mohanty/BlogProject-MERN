import React, { useEffect, useReducer } from 'react'
import './Input.css';
import {validate} from '../../util/validators'

const inputReducer= (state,action)=>{
  switch(action.type){
    case "CHANGE":
      // const 
      return {
        ...state,
        value:action.val,
        isValid:validate(action.val,action.validators)
      }
    case "TOUCHED":
      // const 
      return {
        ...state,
        isTouched:true
      }
    default:
      return state;
  }
}

function Input(props) {
  const [inputState,dispatch]=useReducer(inputReducer,{value:"",isValid:false,isTouched:false});
  const {value,isValid}=inputState;
  const {id,onInput}=props;

  useEffect(()=>{
    onInput(value,isValid,id);
  },[value,isValid,id,onInput]);

  const changeHandler=(e)=>{
    console.log(e.target.value);
    dispatch({type:"CHANGE",val:e.target.value,validators:props.validators});
  }
  const touchedHandler=(e)=>{
    console.log("[Input.js] : Input Toucnhed",inputState);
    dispatch({type:"TOUCHED"});
  }
  const element=(!props.element || props.element!=='textarea'?<input id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchedHandler} value={inputState.value}/>:
  <textarea id={props.id} rows={props.row || 3}  onChange={changeHandler} onBlur={touchedHandler} value={inputState.value}/>)
  return (
    <div className={`form-control ${(!inputState.isValid && inputState.isTouched) && "form-control--invalid"}`}>
        <label htmlFor={props.id} className={props.label}>{props.children}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorMsg}</p>}
    </div>
  )
}

export default Input