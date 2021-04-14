import Router from "next/router";
import Link from "next/link";
import useRequest from "../../hooks/use-request";
import {useState} from "react";
const update=({data})=>{
   console.log(data);
  if(data )
  {
    const [nutritionCategory,setNutritionCategory]=useState(data.nutritionCategory);
    const [nutritionName,setNutritionName]=useState(data.nutritionName);
    const [fats,setFats]=useState(data.fats);
    const [carbohydrates,setCarbohydrates]=useState(data.carbohydrates);
    const [protein,setProtein]=useState(data.protein);
    const [calories,setCalories]=useState(data.calories);
    const [photos,setPhotos]=useState(data.photos);
    const [forBack,setForBack]=useState("Cancel");
    const [disable,setDisable]=useState(false);
    const [editOrConfirm,setEditOrConfirm]=useState("Confirm");
     const {doRequest,errors}=useRequest({
       url:`http://localhost:3030/api-gateway/current-user/nutritionFact/${data.id}`,
      method:"put",
      body:{
        nutritionCategory,
        nutritionName,
        fats,
        carbohydrates,
        protein,
        calories,
        photos
      },
      onSuccess:()=>console.log('Nutrition successFull updated'),
    })
const onClick=()=>{

  if(editOrConfirm==="Confirm"){
    doRequest()
    if(!errors )
    {
      setEditOrConfirm("Edit");
      setDisable('disabled');
      setForBack("Back");
    }
    
   
  }
  if(editOrConfirm==="Edit")
  {
    setEditOrConfirm("Confirm");
    setDisable(false);
    setForBack("Cancel");
  }
 
  
  

}
const cancelMe=()=>{
  Router.push("/nutritionfacts/list");
}

return (
<div className="container  mt-0">

<div className="card-group">
<div className="card">
<div className="card-columns">
  <div class="card" style={{width:"60%"}}>
    <img class="card-img-top" src={data.photos.mainPhoto}alt="Card image" style={{width:"100%"}}/>
    </div>
    
    </div>
<div className="card-body ">
<h2 className="card-title ">{ data.nutritionName}</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={nutritionName} onChange={(e)=>setNutritionName(e.target.value)} type="text"  disabled={disable} /></td>
</tr>
<tr>   
<td className="card-text">Category</td>
<td className="card-text"><input value={nutritionCategory} onChange={(e)=>setNutritionCategory(e.target.value)} type="text"  disabled={disable} /></td>
</tr>
<tr>   
<td className="card-text">Fat</td>
<td className="card-text"><input value={fats} onChange={(e)=>setFats(e.target.value)} type="email" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">Carbohydrates</td>
<td className="card-text"><input value={carbohydrates} onChange={(e)=>setCarbohydrates(e.target.value)} type="number" step="0.01" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text"> Protein</td>
<td className="card-text"><input value={ protein} onChange={(e)=>setProtein(e.target.value)} type="text" step="0.01" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">Calories</td>
<td className="card-text"><input value={calories} onChange={(e)=>setCalories(e.target.value)} type="number" step="0.01" disabled={disable} /></td>
</tr>



<tr>
<td className="card-text"></td>
<td className="card-text text-right"><button onClick={onClick} className="btn btn-primary spaced">{editOrConfirm}</button> </td>

</tr>
<tr>
<td className="card-text"></td>
<td className="card-text text-right"> <button onClick={cancelMe}className="btn btn-primary spaced">{forBack}</button></td>

</tr>


</tbody>
</table>
</div>
</div>
</div>
</div>

</div>


)
}
else
{   
  return null;
}

}

update.getInitialProps=async (context,client,currentUser)=>{
//console.log("exercise/list",currentUser);
//here is admin
const {updateId}=context.query;
console.log("id",updateId);
if(currentUser)
    if(typeof window==="undefined"){
      
       // console.log("server  side");
        client.defaults.baseURL  =`http://localhost:3030/api-gateway/current-user/nutritionFact/${updateId}`;
      //  console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      return {data};
    }
    
    else{
        const response=await fetch(`http://localhost:3030/api-gateway/current-user/nutritionFact/${updateId}`,{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        return {data};
    }


}
export default update;
