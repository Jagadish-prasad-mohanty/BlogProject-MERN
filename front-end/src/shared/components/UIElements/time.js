import React, { useState } from 'react';
const days=[
    {
        curr:'Sun',
        dayLeft:1
    },
    {
        curr:'Tue',
        dayLeft:1
    },
    {
        curr:'Thu',
        dayLeft:1
    },
    {
        curr:'Sat',
        dayLeft:2
    },
   
];
const req_days=[
    {
    curr:'Mon',
dayLeft:2},
    {
    curr:'Wed',
dayLeft:2},
    {
    curr:'Fri',
dayLeft:3},
    
];
const Time =()=>{
    const [date,setDate]=useState();
    const [day,setDay]= useState();

    useState(()=>{
        const d=new Date();
        const dateTime= d.toString().split(' ');
        
        console.log(dateTime);
        const hour=dateTime[4].split(":")[0];
        const check= req_days.find(day=> day.curr===dateTime[0]);
        
        if (check){
            console.log(check)
            if ( hour<10){
                setDate(dateTime[2]);
                setDay(dateTime[0]);

            }else{
                
                let newDateTime= new Date();
                newDateTime.setDate(d.getDate()+check.dayLeft);
                newDateTime=newDateTime.toString().split(' ');
                console.log("newDateTime",newDateTime);
                
                setDate(newDateTime[2]);
                setDay(newDateTime[0]);
               
            }
        }else{
            const findNextDay=days.find(days=>days.curr===dateTime[0]);
            let newDateTime= new Date();
            
            newDateTime.setDate(d.getDate()+findNextDay.dayLeft);
            newDateTime=newDateTime.toString().split(' ')

            console.log(findNextDay,newDateTime)
            setDate(newDateTime[2]);
            setDay(newDateTime[0]);
        }
    },[]);
    return <div>
    <p>Next Class: </p>
    <p>{date}</p>
    <p>{day}</p>
    </div>
}

export default Time;