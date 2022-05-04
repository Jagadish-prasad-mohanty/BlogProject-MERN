import React, { useEffect, useState } from 'react';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH ,VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import useFormHook from '../../shared/hook/form-hook';
import {useDispatch,useSelector} from 'react-redux';

import "./Authenticate.css";
import { logInHandler, signUpHandler } from '../../shared/store/actions/auth-action';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

function Authnticate() {
    const [isSignIn,setIsSignIn]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
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
        if (!isSignIn){
          console.log("Initiate signin");
          initiateForm({
            ...formState.inputs,
            name:undefined
          },formState.inputs.email.isValid && formState.inputs.email.isValid) 
        }
        else{
          console.log("Initiate signup");

          initiateForm({
            ...formState.inputs,
            name:{
              value: "",
              isValid: false,
            }
          },false) 
        }
        setIsSignIn((prevState)=>{
            return !prevState;
        });
      }
      const authSubmitHandler =async (e)=>{
        e.preventDefault();
        if (isSignIn){
          try{
          setIsLoading(true);
            const response= await fetch("http://localhost:5000/api/users/signin",
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                email:formState.inputs.email.value,
                password:formState.inputs.password.value
              })
            }
            );
            if (!response.ok){
              console.log("Error -> 81",response)
              throw new Error("Unable to signin, Invalid credentials.")
            }
            const data=await response.json();
            console.log("response data",data);
            setIsLoading(false);
            dispatch(logInHandler({id:formState.inputs.email.value}))
          }catch(err){
            setIsLoading(false);
            setError(err.message || "Unable to signin.")
            console.log("Authenticate.js Error -> 81 : ",err);
            return;
          }

          
        }else{
          console.log("isSignIn",isSignIn)
          try{
            setIsLoading(true);
            const response= await fetch("http://localhost:5000/api/users/signup",
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                name:formState.inputs.name.value,
                email:formState.inputs.email.value,
                password:formState.inputs.password.value
              })
            }
            );
            if (!response.ok){
              console.log("Error -> 87",response)
              throw new Error("Unable to signup, Please check inputs.")
            }
            const data=await response.json();
            console.log("response data",data);
            setIsLoading(false);
            switchModeHandler();
          }catch(err){
            setIsLoading(false);
            setError(err.message || "Unable to signup.")
            console.log("Authenticate.js Error -> 81 : ",err);
            return;
          }
          
        }
      
        console.log("[Authenticate.js -> formState]",formState);
      }
      const closeErrorModal= ()=>{
        setError(null);
      }
      if (isLoading){
        return <div className='center'>

        <LoadingSpinner/>
          </div>
      }
     
  return (
    <>
      <ErrorModal error={error}
        onClear={closeErrorModal}
      />
      <Card className="auth">

    <form method='POST' onSubmit={authSubmitHandler} style={{marginBottom:"0.5rem"}}>
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
    </>
  )
}

export default Authnticate