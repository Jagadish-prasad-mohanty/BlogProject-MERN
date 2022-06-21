import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useDispatch } from 'react-redux';

import { logInHandler,logOutHandler } from '../../shared/store/actions/auth-action';
import UsersList from '../components/UsersList';
import useHttpClient from '../../shared/hook/http-hook';
import Time from '../../shared/components/UIElements/time';
let logoutTimer;
const Users = () => {
    const [users,setUsers]=useState([]);
    const token=useSelector(state=>state.auth.currentToken);
  const {isLoading,error,sendRequest,clearError} =useHttpClient();
  const [tokenExpTime,setTokenExpTime]=useState();
  const dispatch=useDispatch();
  
  useEffect(()=>{
    
     
      sendRequest(process.env.REACT_APP_BACKEND_URL+"/users").then((responseData)=>{

        console.log("response data",responseData);
        setUsers(responseData.users);
      }).catch(err=>{})
  },[sendRequest])
  
  useEffect(()=>{
    const userData= JSON.parse(localStorage.getItem("userData"));
    if(userData && userData.token){
      const expTime=userData.expTime;
      const time=new Date().getTime();
      setTokenExpTime(expTime);
      console.log(expTime,time);
      if (expTime>time)
      dispatch(logInHandler({id:userData.userId,token:userData.token}));  
      else{
        
        localStorage.removeItem('userData');
        
      }
    }else{
      console.log("Setting to nulll");
        setTokenExpTime(null);
    }
  },[dispatch])
  useEffect(()=>{
    if (token && tokenExpTime){
      const time=new Date().getTime();
      const remainingTime=tokenExpTime-time;
      console.log("remainingTime",remainingTime);
      logoutTimer= setTimeout(()=>{
        dispatch(logOutHandler());
      },remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  },[token,tokenExpTime])
  if (isLoading){
    return <div className="center">
      <LoadingSpinner/>
    </div>
  }
  return <>
  <ErrorModal 
    error={error}
    onClear={clearError}
  />
  <UsersList items={users} />;

  </>
};

export default Users;
