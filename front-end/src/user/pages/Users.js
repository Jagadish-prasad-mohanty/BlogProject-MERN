import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UsersList';
import useHttpClient from '../../shared/hook/http-hook';

const Users = () => {
    const [users,setUsers]=useState([]);
  const {isLoading,error,sendRequest,clearError} =useHttpClient();
  
  useEffect(()=>{
    
     
      sendRequest("http://localhost:5000/api/users").then((responseData)=>{

        console.log("response data",responseData);
        setUsers(responseData.users);
      }).catch(err=>{})
  },[sendRequest])
  
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
