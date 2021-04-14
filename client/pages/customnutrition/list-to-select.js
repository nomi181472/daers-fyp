import Link from "next/link";
import axios from "axios";
import Router  from "next/router";
import fetch from "isomorphic-unfetch";
import ListEachDay from "./list-each-day";
const list= ({data,scheduleId})=>{

let exerciseList;
console.log("scheduleId",scheduleId)


console.log(data);
if(data ){
  
exerciseList=data.nutrition.map(n=>{
  return (
    <tr key={n.id}>
      <td>{n.nutritionCategory}</td>
      <td>{n.nutritionName}</td>
      <td>{n.fats}</td>
      <td>{n.carbohydrates}</td>
      <td>{n.protein}</td>
      <td>{n.calories}</td>
      <td><img src={n.photos.mainPhoto} className="img-fluid img-thumbnail rounded" alt={"Image: "+n.nutritionName} layout="responsive" width={300}
        height={300} /></td>
      
      <td></td>
      <td>
       <Link href="/customnutrition/[scheduledetailedid]" as={`/customnutrition/${n.id}/?${scheduleId}`}>
   <a className="btn btn-primary  active form-group" role="button" aria-pressed="true">add</a>
       </Link>
      </td>
   
    </tr>
  )
});
 return (
 <div className='container-fluid'>
   <div className="col-xs-3">
  <h1>NutritionFacts</h1>
  <div className="table-responsive">
  <table className="table table-striped">
    <thead>
      <tr>
      <th>
     Category
        </th>
        <th>
         Name
        </th>
        <th>
        Fats
        </th>
        <th>
        Carbohydrates
        </th>
        <th>
        Protein
        </th>
        <th>
        Calories
        </th>
        
        <th>
          Image
        </th>
        <th></th>
        <th>
          Click to Add
        </th>
      </tr>
    </thead>
    <tbody>
    {exerciseList}
    </tbody>
  </table>
  </div>
  </div>
  <div>
    </div>
   
 
</div>

)}
 else
 return null;
}

list.getInitialProps=async (context,client,currentUser)=>{
  const {scheduleId}=context.query
if(currentUser)
    if(typeof window==="undefined"){
      console.log(context.req.headers)
      console.log("server side")
      const response=await fetch("http://localhost:3030/api-gateway/current-user/nutritionFact",{credentials:"include",headers: context.req.headers})
      const data=await response.json()
      return {data,scheduleId};
    }
    
    else{
     
        const response=await fetch("http://localhost:3030/api-gateway/current-user/nutritionFact",{credentials:"include"})
        const data=await response.json()
        return {data,scheduleId};
    }
    return null


}
export default list;
