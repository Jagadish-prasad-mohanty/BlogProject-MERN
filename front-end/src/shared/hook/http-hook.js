import React, { useRef, useState,useEffect } from "react";

const useHttpClient= ()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState();
    const activeHttpRequest= useRef([]);
    useEffect(()=>{
        return ()=>{
            activeHttpRequest.current.forEach(abortCtrl=>abortCtrl.abort());
        }
    },[])
    const sendRequest= async (url,method= "GET",body=null,headers={})=>{
        setIsLoading(true);
        const abortCtrl= new AbortController();
        activeHttpRequest.current.push(abortCtrl);
        try{
            const response= await fetch(url,{
                method,
                body,
                headers,
                signal:abortCtrl.signal
            });
            console.log(response);
            if (!response.ok){
                throw new Error(response.message || "Something went wrong.");
            }
            const data= await response.json();
            setIsLoading(false);
            console.log("data",data)
            return data;
        }catch(err){
            setError(err.message);
            setIsLoading(false);
            return {}
        }

    }
    const clearError= ()=>{
        setError(null);
    }
    return {isLoading,error,sendRequest,clearError};

}

export default useHttpClient;