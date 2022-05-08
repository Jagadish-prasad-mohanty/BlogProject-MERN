import React, { useState,useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList';

function UserPlaces() {
    const userId=useParams().userId;
    const [userPlaces,setUserPlaces]=useState([]);
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState();
    const history= useHistory();
    useEffect(()=>{
           const fetchUserPlaces= async ()=>{
               try{
                setIsLoading(true);
                   const response=await fetch(`http://localhost:5000/api/places/user/${userId}`);
                   const data= await response.json();
                   if (!response.ok){
                       throw new Error(data.message);
                   }
                   console.log(data)
                   setUserPlaces(data.userPlace);
                   setIsLoading(false);
               }catch(err){
                    setIsLoading(false);
                   setError(err.message || "Unable to find requested user.");
               }
           } 
           fetchUserPlaces();
    },[userId]);
    const deletePlaceHandler =(placeId)=>{
        console.log(placeId)
        setIsLoading(true)
        fetch(`http://localhost:5000/api/places/${placeId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>response.json()).then(data=>{
            console.log(data);
            setIsLoading(false);
            history.push("/");
        }).catch(err=>{
             setIsLoading(false);
            setError(err.message || "Unable to find requested user.");
        
        });
    }
    const closeErrorModal= ()=>{
        setError(null);
        history.push("/")
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
        onClear={closeErrorModal}
    />
    <PlaceList items={userPlaces} deletePlace={deletePlaceHandler}/>
      </>
  )
}

export default UserPlaces