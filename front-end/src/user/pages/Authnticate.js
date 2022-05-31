import React, { useEffect, useState } from 'react';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH ,VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import useFormHook from '../../shared/hook/form-hook';
import {useDispatch,useSelector} from 'react-redux';
import { logInHandler, signUpHandler } from '../../shared/store/actions/auth-action';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import useHttpClient from '../../shared/hook/http-hook';
import ImageUploader from '../../shared/components/UIElements/ImageUploader';

import "./Authenticate.css";

function Authnticate() {
    const [isSignIn,setIsSignIn]=useState(false);
    // const [isLoading,setIsLoading]=useState(false);
    // const [error,setError]=useState(null);
    const {isLoading,error,sendRequest,clearError}= useHttpClient();
   const dispatch= useDispatch();
    
    const {formState, inputHandler,initiateForm} =useFormHook({
        inputs: {
         name :{
           value:"",
           isValid:false
         },
          profileImage:{
            value:null,
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
            name:undefined,
            profileImage:undefined
          },formState.inputs.email.isValid && formState.inputs.password.isValid) 
        }
        else{
          console.log("Initiate signup");

          initiateForm({
            ...formState.inputs,
            name:{
              value: "",
              isValid: false,
            },
            profileImage:{
              value:null,
              isValid:false
            }
          },false) 
        }
        setIsSignIn((prevState)=>{
            return !prevState;
        });
      }
      const authSubmitHandler =async (e)=>{
        e.preventDefault();
        console.log(formState.inputs);
        if (isSignIn){
          console.log("isSignIn",isSignIn)
          try{

            const responseData=await sendRequest("http://localhost:5000/api/users/signin",
            
              "POST",
              JSON.stringify({
                email:formState.inputs.email.value,
                password:formState.inputs.password.value
              }),
              {
                "Content-Type":"application/json"
              },
              
            );
           
            
            dispatch(logInHandler({id:responseData.userId,token:responseData.token}));
          }catch(err){
          }
          

          
        }else{
          console.log("isSignIn",isSignIn)
          const formData= new FormData();
          formData.append("email",formState.inputs.email.value);
          formData.append("name",formState.inputs.name.value);
          formData.append("password",formState.inputs.password.value);
          formData.append("profileImage",formState.inputs.profileImage.value);
          try{

            const responseData= await sendRequest("http://localhost:5000/api/users/signup",
            
              "POST",
              formData,
              
              
              );
              console.log("response data",responseData);
              switchModeHandler();   
            }catch(err){}
            
            
         
          
        }
      
        console.log("[Authenticate.js -> formState]",formState);
      }
      
      if (isLoading){
        return <div className='center'>

        <LoadingSpinner/>
          </div>
      }
     
  return (
    <>
      <ErrorModal error={error}
        onClear={clearError}
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
        {!isSignIn &&
         <ImageUploader id="profileImage" onInput={inputHandler} errorMsg="Please add a valid Image"/>}
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