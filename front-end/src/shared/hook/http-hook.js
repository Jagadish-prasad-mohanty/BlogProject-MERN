import React, { useRef, useState,useEffect,useCallback } from "react";

const useHttpClient= ()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState();
    const activeHttpRequest= useRef([]);
    useEffect(()=>{
        return ()=>{
            activeHttpRequest.current.forEach(abortCtrl=>abortCtrl.abort());
        }
    },[])
    const sendRequest=useCallback( async (url,method= "GET",body=null,headers={})=>{
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
            activeHttpRequest.current= activeHttpRequest.current.filter(abtCtrl=> abtCtrl!==abortCtrl);
            const data= await response.json();
            if (!response.ok){
                throw new Error(data.message || "Something went wrong.");
            }
            setIsLoading(false);
            console.log("data",data);
            return data;
        }catch(err){
            setError(err.message);
            setIsLoading(false);
            throw err;
        }

    },[])
    const clearError= ()=>{
        setError(null);
    }
    return {isLoading,error,sendRequest,clearError};

}

export default useHttpClient;