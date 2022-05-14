import React, { useState,useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList';
import useHttpClient from '../../shared/hook/http-hook';

function UserPlaces() {
    const userId=useParams().userId;
    const [userPlaces,setUserPlaces]=useState([]);
    const history= useHistory();
    const {isLoading,error,sendRequest,clearError}= useHttpClient();

    useEffect(()=>{
               
        sendRequest(`http://localhost:5000/api/places/user/${userId}`).then(responseData=>{

            console.log(responseData);
            setUserPlaces(responseData.userPlace);
        });
                   
             
           
    },[userId]);
    const deletePlaceHandler =(placeId)=>{
        console.log(placeId)
        
        sendRequest(`http://localhost:5000/api/places/${placeId}`,
            "DELETE",
            null,
            {
                "Content-Type":"application/json"
            }
        ).then(responseData=>{
            console.log(responseData);
            // history.push("/");
            setUserPlaces(prevState=>prevState.filter(place=>place.id!==placeId));
        })
    }
  
      if (isLoading){
          return <div className='center'>
              <LoadingSpinner/>
          </div>
      }
  return (
      <>
    <ErrorModal
    error={error}
        onClear={clearError}
    />
    <PlaceList items={userPlaces} deletePlace={deletePlaceHandler}/>
      </>
  )
}

export default UserPlaces