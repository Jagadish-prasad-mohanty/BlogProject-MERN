import React, { useState } from 'react';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH ,VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import useFormHook from '../../shared/hook/form-hook';

import "./Authenticate.css";

function Authnticate() {
    const [isSignIn,setIsSignIn]=useState(false);

    const [formState, inputHandler,onFormSubmitHandler] =useFormHook({
        inputs: {
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
        setIsSignIn((prevState)=>{
            return !prevState;
        });
      }
  return (
      <Card className="auth">

    <form method='POST' onSubmit={onFormSubmitHandler} style={{marginBottom:"0.5rem"}}>
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
        <Button type="submit" disabled={!formState.isFormValid}>Add User</Button>
    </form>
    <Button onClick={switchModeHandler} inverse>{isSignIn?"SWITCH TO SIGNUP":"SWITCH TO SIGNIN"}</Button>
      </Card>
  )
}

export default Authnticate