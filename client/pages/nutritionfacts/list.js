import Link from "next/link";
import axios from "axios";
import Router  from "next/router";
const list= ({data,currentUser})=>{
 //   console.log(data);
   // console.log("running");
    //console.log(currentUser);
let exerciseList;


const deleteIt=async (e)=>{
  //console.log("click",e.target.value);
  const response= await axios.delete(`http://localhost:3030/api-gateway/current-user/nutritionFact/${e.target.value}`,{withCredentials:"include"})
 if(response.status===200){
  Router.push("list");
 }
 
}
console.log(data);
if(data){
  
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
      <td>
       <Link href="/nutritionfacts/[updateId]" as={`/nutritionfacts/${n.id}`}>
   <a className="btn btn-primary  active form-group" role="button" aria-pressed="true">Update</a>
       </Link>
      </td>
    <td><button value={n.id}  onClick={deleteIt} className="btn btn-primary active form-group">Delete</button></td>
    </tr>
  )
});
 return (
 <div className='container-fluid'>
   <div className="col-xs-3">
  <h1>NutritionFacts</h1>
  <div className="table-responsive">
  <Link href="add"><a className="btn btn-primary">Add NutritionFacts</a></Link>
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
//console.log("exercise/list",currentUser);
//here is admin
if(currentUser)
    if(typeof window==="undefined"){
      
       // console.log("server  side");
        client.defaults.baseURL  ="http://localhost:3030/api-gateway/current-user/nutritionFact";
       // console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      //console.log(data);
      return {data};
    }
    
    else{
        const response=await fetch("http://localhost:3030/api-gateway/current-user/nutritionFact",{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        //console.log(data);
        return {data};
    }


}
export default list;
