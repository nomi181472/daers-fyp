
import Router  from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";
import fetch from "isomorphic-unfetch";
const exerciseDetails=({nf})=>{
    console.log(nf);
    //card-img-top

        if(nf )
        {
          var date = new Date();
           const [sameDay, setSameDay] = useState( date.toISOString().substring(0, 10));
           const [discription,setDiscription]=useState([]);
           const [fats,setFats]=useState(nf.fats);
          const [carbohydrates,setCarbohydrates]=useState(nf.carbohydrates);
          const [photos,setPhotos]=useState(nf.photos.mainPhoto);
          const [protein,setProtein]=useState(nf.protein);
          const [calories,setCalories]=useState(nf.calories);
          const [dayTime,setDayTime]=useState("morning");
          const [nutritionCategory,setNutritionCategory]=useState(nf.nutritionCategory)
          const nutrition={
            nutritionName:nf.nutritionName,
            nutritionCategory:nf.nutritionCategory,
            fats:fats,
            carbohydrates:carbohydrates,
            protein:protein,
            calories:calories,
            discription:[discription],
            photos:photos

          }
          const time=[{
            sameNutrition:nf.id,
            nutrition:nutrition
          }]
         const day= [{
          dayTime:dayTime,
          time:time,
              
              

          }]
          const document=[{
            sameDay:sameDay,
            day:day
            
          }];
          console.log(document);
           const {doRequest,errors}=useRequest({
             url:"http://localhost:3031/api-gateway/current-user/schedulenf/5fd8dedf3984954bc0f48fdd",
            method:"put",
            body:{
              document:document
            },
            onSuccess:()=>console.log('temp'),
          })
      const onClick=()=>{
        doRequest()
        //console.log(document);
      
      }
      const cancelMe=()=>{
        Router.push("/");
      }
      const handleDiscripton=(e)=>{
        if(e.target.value)
        setDiscription(e.target.value);
        else
        setDiscription(" ");
      };

      

    return (
      <div className="container  mt-0">
  
  <div className="card-group">
    <div className="card">
    <h2 className="" >{nf.photos.mainPhoto}</h2>
    <div className="card-body ">
    <h2 className="card-title ">{ nf.nutritionName}</h2>
   
      <div className="card-body">
      <table className="table table-borderless">
  <tbody>
  <tr>   
  <td className="card-text">Category</td>
  <td className="card-text">{nf.nutritionCategory}</td>
</tr>
<tr>
  <td className="card-text">Fats</td>
  
  <td className="card-text"><input onChange={(e)=>{setFats(e.target.value)}} type="number" step="0.01" value={fats} /></td>
  
</tr>
<tr>
  <td className="card-text">carbohydrates</td>
  
  <td className="card-text"><input onChange={(e)=>{setCarbohydrates(e.target.value)}} type="number" step="0.01" value={carbohydrates} /></td>
</tr>

<tr>
  <td className="card-text">protein</td>
  <td className="card-text"><input onChange={(e)=>{setProtein(e.target.value)}} type="number" step="0.01" value={protein} /></td>
</tr>
<tr>
  <td className="card-text">calories</td>
  <td className="card-text"><input onChange={(e)=>{setCalories(e.target.value)}} type="number" step="0.01" value={calories} /></td>

</tr>

<tr>
  <td  className="card-text">
      Select Date
  </td>
<td className="card-text"><input value={sameDay} onChange={(e)=>{setSameDay(e.target.value)}}type="date"/></td>
</tr>
<tr>
  <td  className="card-text">
      Select Time
  </td>
<td className="card-text"><select className="form-control" onChange={(e)=>setDayTime(e.target.value)} value={dayTime}>
<option value="morning">morning</option>
<option  value="lunch">lunch</option>
<option value="dinner">dinner</option>
  </select></td>
</tr>
<tr>
  <td className="card-text">Your Discription</td>
<td className="card-text"><textarea onChange={handleDiscripton} className="form-control rounded-0" placeholder="Any note ......." rows="3"></textarea>
  </td>
  </tr>
 
<tr>
  <td className="card-text"></td>
  <td className="card-text text-right"><button onClick={onClick} className="btn btn-primary spaced">Confirm</button> </td>
  
</tr>
<tr>
  <td className="card-text"></td>
  <td className="card-text text-right"> <button onClick={cancelMe}className="btn btn-primary spaced">Cancel</button></td>
  
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
  //console.log("runned",currentUser);
  
   const {scheduledetailsid}=context.query;
   console.log(scheduledetailsid)
  // console.log("ExerciseId server side");
  if(currentUser){
  if( typeof window ==="undefined"){
 const response=await fetch(`http://localhost:3030/api-gateway/current-user/nutritionFact/${scheduledetailsid}`,{ credentials: 'include',headers: context.req.headers});

   const nf=await response.json()
 
   return {nf:nf};
  }
   else
  {
    
    const res = await fetch(`http://localhost:3030/api-gateway/current-user/nutritionFact/${scheduledetailsid}`,{ credentials: 'include'})
    const nf = await res.json()
    return {nf:nf};
  }}
  return {nf:null};;
  

}

export default exerciseDetails
