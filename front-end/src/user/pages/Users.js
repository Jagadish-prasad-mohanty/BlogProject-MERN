import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UsersList';

const Users = () => {
  const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [users,setUsers]=useState([]);
  useEffect(()=>{
    
      setIsLoading(true);
      fetch("http://localhost:5000/api/users").then(response=>{

        if (!response.ok){
          console.log("Error -> 87",response)
          throw new Error("Unable to load users.")
        }
        return response.json()
      }).then( data=>{

        console.log("response data",data);
        setUsers(data.users);
        setIsLoading(false);
      }).catch(err=>{
      setIsLoading(false);
      setError(err.message || "Unable to load users.")
      console.log("Authenticate.js Error -> 81 : ",err);
      return;
    })
  },[])
  const closeErrorModal= ()=>{
    setError(null);
  }
  if (isLoading){
    return <div className="center">
      <LoadingSpinner/>
    </div>
  }
  return <>
  <ErrorModal 
    error={error}
    onClear={closeErrorModal}
  />
  <UsersList items={users} />;
  </>
};

export default Users;
