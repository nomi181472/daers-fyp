import Link from "next/link";
import Image from 'next/image'
import {useState} from "react";
import axios from "axios";
import Router  from "next/router";
const list= ({data,currentUser})=>{
 //   console.log(data);
   // console.log("running");
    //console.log(currentUser);
let exerciseList;


const deleteIt=async (e)=>{
  //console.log("click",e.target.value);
  const response= await axios.delete(`http://localhost:3020/api-gateway/current-user/exercise/${e.target.value}`,{withCredentials:"include"})
 if(response.status===200){
  Router.push("list");
 }
 
}
if(data ){
  
exerciseList=data.exercise.map(ex=>{
  return (
    <tr key={ex.id}>
      <td>{ex.exerciseName}</td>
      <td>{ex.exerciseCategory}</td>
      <td>{ex.level}</td>
      <td>{ex.modality}</td>
      <td>{ex.joint}</td>
      <td>{ex.type}</td>
      <td>{ex.direction}</td>
      <td><img src={ex.photos.mainPhoto} className="img-fluid img-thumbnail rounded" alt={"Image: "+ex.exerciseName} layout="responsive" width={300}
        height={300} /></td>

      <td>
       <Link href="/exercises/[updateId]" as={`/exercises/${ex.id}`}>
   <a className="btn btn-primary  active form-group" role="button" aria-pressed="true">Update</a>
       </Link>
      </td>
    <td><button value={ex.id}  onClick={deleteIt} className="btn btn-primary active form-group">Delete</button></td>
    </tr>
  )
});
 return (
 <div className='container-fluid'>
  
   <div className="col-xs-3">
  <h1>Exercies</h1>
  <div className="table-responsive">
  <Link href="add"><a className="btn btn-primary">Add Exercise</a></Link>
  <table className="table table-striped">
    <thead>
      <tr>
      <th>
          Name
        </th>
        <th>
          Category
        </th>
        <th>
          Level
        </th>
        <th>
          Modality
        </th>
        <th>
          Joint
        </th>
        <th>
          Type
        </th>
        <th>
          Direction
        </th>
        <th>
          Image
        </th>
        <th>
         
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
      
        console.log("server  side");
        client.defaults.baseURL  ="http://localhost:3020/api-gateway/current-user/exercise";
       // console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      return {data};
    }
    
    else{
        const response=await fetch("http://localhost:3020/api-gateway/current-user/exercise",{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        return {data};
    }


}
export default list;
