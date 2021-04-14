
import Router  from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";
import fetch from "isomorphic-unfetch"
const exerciseDetails=({ex})=>{
    //console.log(ex);
    //card-img-top

        if(ex)
        {
          var date = new Date();
           const [sameDay, setSameDay] = useState( date.toISOString().substring(0, 10));
           const [sets, setSets] = useState(0);
           const [reps, setReps] = useState([]);
           const [discription,setDiscription]=useState([]);
           const [url,setUrl]=useState("");
           const [method,setMethod]=useState("");
           const [scheduleId,setScheduleId]=useState("");
           const [showReps,setShowReps]=useState([])
         
         
          const exercise={
            exerciseName:ex.exerciseName,
            sets:sets,
              reps:reps,
              discription:[discription],
              photos:ex.photos.photosUrl

          }
         const day= [{
              sameExercise:ex.id,
              exercise:exercise,
              

          }]
          const document=[{
            sameDay:sameDay,
            day:day
            
          }];
          const setSchedule=async()=>{
            const resnf=await fetch("http://localhost:3021/api-gateway/current-user/schedulee-user/getschedule",{credentials:"include"})
            const data=await resnf.json();
           // console.log('data',data.schedulee.length);
            if(data.schedulee.length &&data.schedulee[0].id)
            {	
              setScheduleId(data.schedulee[0].id)
            }
            if(scheduleId)
            {
              
              
              setUrl("http://localhost:3021/api-gateway/current-user/schedulee/"+scheduleId)
              setMethod("put")
              
            }
            else
            {
              
              setUrl("http://localhost:3021/api-gateway/current-user/exerciseschedule")
              setMethod("post")
             
            }
          }
          setSchedule();
         
           const {doRequest,errors}=useRequest({
             url:url,
            method:method,
            body:{
              document:document
            },
            onSuccess:()=>console.log('temp'),
          })
      const onClick=async()=>{
        
        doRequest()
        
        if(!scheduleId)
        {
           Router.push("/schedules/listcards")
        }
        else
        {
          Router.push("/customexercise/list-to-select")
        }
       
      
      }
      const cancelMe=()=>{
        Router.push("/customexercise/list-to-select");
      }
      const handleDiscripton=(e)=>{
        if(e.target.value)
        setDiscription(e.target.value);
        else
        setDiscription(" ");
      };
     const handleReps=(e)=>{
     
const val=parseInt(e.target.value)
const ind=parseInt(e.target.getAttribute("name"))
const arr=reps.map((value, index) => {
 return ((index === ind ? val : value))
 })
 setReps(arr)
 console.log(arr)

 

      }
      const handleSets=(e)=>{
         setSets(parseInt(e.target.value))
         if(parseInt(e.target.value)&&parseInt(e.target.value)<=6)
         {let arr = Array.apply(null,Array(parseInt(e.target.value))).map(() => {return 10});
         //console.log("arr",arr)
         setReps(Array.apply(null,Array(parseInt(e.target.value))).map(() => {return 10}))
         console.log(arr,reps)
         setShowReps(arr.map((value,ind)=>{return  <input   className="form-control" name={ind} onChange={handleReps} placeholder={value} key={ind } />}))
     
        }
        else{
          
          setReps([10,10,10])
        }
        
      }

    return (
      <div className="container  mt-0">
  
  <div className="card-group">
    <div className="card">
    <h2 className="" >{ex.photos.photosURL}</h2>
    <div className="card-body ">
    <h2 className="card-title ">{ ex.exerciseName}</h2>
   
      <div className="card-body">
      <table className="table table-borderless">
  <tbody>
  <tr>   
  <td className="card-text">Category</td>
  <td className="card-text">{ex.exerciseCategory}</td>
</tr>
<tr>
  <td className="card-text">Type</td>
  <td className="card-text">{ex.type}</td>
</tr>
<tr>
  <td className="card-text">Joint</td>
  <td className="card-text">{ex.joint}</td>
</tr>

<tr>
  <td className="card-text">Direction</td>
  <td className="card-text">{ex.direction}</td>
</tr>
<tr>
  <td className="card-text">Modality</td>
  <td className="card-text">{ex.modality}</td>
</tr>
<tr>
  <td className="card-text">Level</td>
  <td className="card-text">{ex.level}</td>
</tr>
<tr>
  <td  className="card-text">
      Select Date
  </td>
<td className="card-text"><input value={sameDay} onChange={(e)=>{setSameDay(e.target.value)}}type="date"/></td>
</tr>
<tr>
  <td className="card-text">Enter Sets</td>
  <td className="card-text"> <input onChange={handleSets} placeholder="your Sets here.."/></td>
</tr>
{showReps.length!==0&&(<tr>
  <td className="card-text">Enter Reps</td>
  <td><div className="form-group"><p   className="input-group">{showReps}</p></div></td>
</tr>)}
<tr>
  <td className="card-text">Your Discription</td>
<td className="card-text"><textarea onChange={handleDiscripton} className="form-control rounded-0" placeholder="Any note ......." rows="3"></textarea>
  </td>
  </tr>
 
<tr>
  <td className="card-text"></td>
  <td className="card-text text-right"><button onClick={onClick} className="btn btn-primary form-control spaced" style={{width:"120px"}}><i className="fa fa-check"   aria-hidden="true" key="Confirm Exercise"></i> Confirm</button> </td>
  
</tr>
<tr>
  <td className="card-text"></td>
  <td className="card-text text-right"> <button onClick={cancelMe}className="btn btn-primary  form-control spaced " style={{padding:"1%",backgroundColor:"white",color:"#007bff" , width:"120px"}}><i className="fa fa-window-close"   style={{color:"#007bff"}} aria-hidden="true" key="Cancel Exercise"></i> Cancel</button></td>
  
</tr>

     
</tbody>
</table>
</div>
</div>
</div>
</div>
  <style>
    {
      `
      .mt-0 {
        margin-top: 20px !important;
      }
      .spaced{
        margin-left: 10px !important;
      }
      `
    }
  </style>
</div>

    
    )
  }
    else
    {   
        return null;
    }

}
exerciseDetails.getInitialProps=async(context,client,{currentUser})=>{
  
  let scheduleId;
  if(context.asPath[context.asPath.length-1]==="?")
  {
    scheduleId=""
  }
  else{
    scheduleId=context.asPath.substring(context.asPath.length-24,context.asPath.length-1)
  }
   const {exercisedetailsid}=context.query;
   
  
  if(currentUser){
  if( typeof window ==="undefined"){
    
   
    const response=await fetch(`http://localhost:3020/api-gateway/current-user/exercise/${exercisedetailsid}`,{headers: context.req.headers});

 client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/"
   const ex=await response.json()
 
   return {ex:ex,scheduleId:scheduleId};
  }
   else
  {
    
    const res = await fetch(`http://localhost:3020/api-gateway/current-user/exercise/${exercisedetailsid}`,{ credentials: 'include'})
    const ex = await res.json()
    return {ex:ex,scheduleId:scheduleId};
  }}
  return {ex:null,scheduleId:null};;
  

}

export default exerciseDetails
