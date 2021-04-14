import fetch from "isomorphic-unfetch";
import Card from "./card";
import Router from "next/router";
import axios from "axios";
import ScheduleeList from "../customexercise/scheduleeList";
import SchedulenfList from "../customnutrition/schedulenfList";
import {useState} from "react";
const list=({schedulenf,schedulee},currentUser) =>{
    console.log("currentUser",currentUser)
   
   let scheduleIdE="",scheduleIdNF="";
  
   
    if(!schedulenf.length)
    {
        
        schedulenf=null
    }
    else{
        scheduleIdNF=schedulenf[0].id
       
    }
    
    if(!schedulee.length)
    {
       
        schedulee=null
    }
    else{
        scheduleIdE=schedulee.id;
    }
    
    const [viewExerciseSchedule,setViewExerciseSchedule]=useState(false);
    const [viewNutritionSchedule,setViewNutritionSchedule]=useState(false)
  const [location,setLocation]=useState([""]);
  //const [isCreateSchdule,setIsCreateSchdule]=useState(false)
  const createSchedule=()=>{
     Router.push(`/customexercise/list-to-select/?scheduleId=${scheduleIdE}`)
    
}
const createScheduleNf=()=>{
    Router.push(`/customnutrition/list-to-select/?scheduleId=${scheduleIdNF}`)
   
}
  const onExerciseSchedule=()=>{
      if(viewExerciseSchedule)
    setViewExerciseSchedule(false);
    else setViewExerciseSchedule(true)
}
const onDietSchedule=()=>{
    if(viewNutritionSchedule)
    setViewNutritionSchedule(false);
    else setViewNutritionSchedule(true)
    
  
 
}
const deleteDayE=async(date)=>{
  
    
    try{
    const res =await axios.delete(`http://localhost:3021/api-gateway/current-user/schedulee/day/${schedulee[0].id}/${date}`,{withCredentials:"include"})
   
    return true;
    }
    catch(err){
        console.log("unable to delete",err);
        return false;
    }

}
const deleteDayN=async(date)=>{
    
    
    
    try{
    const res =await axios.delete(`http://localhost:3031/api-gateway/current-user/schedulenf/day/${schedulenf[0].id}/${date}`,{withCredentials:"include"})
   
    return true;
    }
    catch(err){
        console.log("unable to delete",err);
        return false;
    }

}
const addMoreEx=()=>{
    Router.push("/customexercise/list-to-select")
}
const addMoreNF=()=>{
    Router.push("/customnutrition/list-to-select")
}

const deleteFromDayE=async(exid,data)=>{
    //console.log(exid,data);
    try{
        const res =await axios.delete(`http://localhost:3021/api-gateway/current-user/schedulee/object/${schedulee[0].id}/${exid}/${data}`,{withCredentials:"include"})
        //Router.reload()
        return true;
        }
        catch(err){
            console.log("unable to delete",err);
            return false;
        }
}
    return(
        <div>

{!viewExerciseSchedule&&!viewNutritionSchedule&&(<Card addMoreEx={addMoreEx} addMoreNF={addMoreNF} createSchedule={createSchedule} createScheduleNf={createScheduleNf} schedulenf={schedulenf} schedulee={schedulee} onExerciseSchedule={onExerciseSchedule} onDietSchedule={onDietSchedule} />)}
        {viewExerciseSchedule  &&(<ScheduleeList deleteDayE={deleteDayE}  deleteFromDayE={deleteFromDayE} onExerciseSchedule={onExerciseSchedule} schedulee={schedulee} />)  }
        {viewNutritionSchedule  &&(<SchedulenfList deleteDayN={deleteDayN}   onDietSchedule={onDietSchedule} schedulenf={schedulenf} id={schedulenf[0].id} />)  }
        </div>

    )
}


list.getInitialProps=async(context,)=>{
   
   
    if(typeof window==="undefined")
    {
       
        const resnf=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include",headers: context.req.headers})
       
        const rese=await fetch("http://localhost:3021/api-gateway/current-user/schedulee-user/getschedule",{credentials:"include",headers: context.req.headers})
        
        const {schedulenf}=await resnf.json()
        const {schedulee}=await rese.json()
        console.log("schedule",resnf)
        return {schedulenf:schedulenf,schedulee:schedulee}
        
    }
    else
    {
        const resnf=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include"})
        const rese=await fetch("http://localhost:3021/api-gateway/current-user/schedulee-user/getschedule",{credentials:"include"})
        const {schedulenf}=await resnf.json()
        const {schedulee}=await rese.json()
        
        return {schedulenf:schedulenf,schedulee:schedulee}
    }

   
}

export default list