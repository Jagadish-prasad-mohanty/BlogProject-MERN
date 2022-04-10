import React, { useEffect, useState } from 'react';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH ,VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import useFormHook from '../../shared/hook/form-hook';
import {useDispatch,useSelector} from 'react-redux';

import "./Authenticate.css";
import { logInHandler, signUpHandler } from '../../shared/store/actions/auth-action';

function Authnticate() {
    const [isSignIn,setIsSignIn]=useState(false);
   const dispatch= useDispatch();
   const users=useSelector(state=>state.auth.users);
    
    const [formState, inputHandler,onFormSubmitHandler,initiateForm] =useFormHook({
        inputs: {
         name :{
           value:"",
           isValid:false
         },
          email: {
            value: "",
            isValid: false,
          },
          password: {
            value: "",
            isValid: false,
          }
        },
        isFormValid: false,
      });   
      const switchModeHandler =()=>{
        if (!isSignIn)
        initiateForm({
          ...formState.inputs,
          name:undefined
        },formState.inputs.email.isValid && formState.inputs.email.isValid) 
        else
        initiateForm({
          ...formState.inputs,
          name:{
            value: "",
            isValid: false,
          }
        },false) 
        setIsSignIn((prevState)=>{
            return !prevState;
        });
      }
      const formSubmitHandler =(e)=>{
        e.preventDefault();
        if(isSignIn){
          const currentUser= users.find(user=>user.email===formState.inputs.email.value);
          if (!currentUser){
            console.log("User not found",formState);
            return;
          }
          console.log("User found",currentUser.id);

          dispatch(logInHandler({id:currentUser.id}));
        }else{
          console.log("Signup");
          dispatch(signUpHandler({
            id:Math.random(),
            name:formState.inputs.name.value,
            email:formState.inputs.email.value,
            password:formState.inputs.password.value,
            image:
            'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          places: 3
          }))
          setIsSignIn(true);
        }
        console.log("[Authenticate.js -> formState]",formState);
      }
     
  return (
      <Card className="auth">

    <form method='POST' onSubmit={formSubmitHandler} style={{marginBottom:"0.5rem"}}>
        <h2>{isSignIn?"SignIn Required":"SignUp Required"}</h2>
        <hr/>
        {!isSignIn &&
            <Input
            type="text"
            id="name"
            placeholder="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorMsg="Please add a valid Name"
        >Name </Input>
        }
        <Input
            type="text"
            id="email"
            placeholder="Your Email Id"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorMsg="Please add a valid Email Id"
        >Email </Input>
        <Input
            type="password"
            id="password"
            placeholder="Your Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
            errorMsg="Password should be atleast 6 characters."
        >Password</Input>
        <Button type="submit" disabled={!formState.isFormValid}>{!isSignIn?"SIGNUP":"SIGNIN"}</Button>
    </form>
    <Button onClick={switchModeHandler} inverse>{isSignIn?"SWITCH TO SIGNUP":"SWITCH TO SIGNIN"}</Button>
      </Card>
  )
}

export default Authnticate