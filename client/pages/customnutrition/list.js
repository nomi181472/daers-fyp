import Link from "next/link";
import fetch from "isomorphic-unfetch";
const listExercise=({data})=>{
   console.log(data.schedule);
    //console.log("running");
let nutritionList;
data.schedule.map((nf)=>{
  console.log(nf);
})
if(data && null){
nutritionList=data.schedulenf.map(nf=>{
  return (
    <tr key={nf.id}>
      <td>{nf.exerciseName}</td>
      <td>{nf.exerciseCategory}</td>
      <td>{nf.level}</td>
      <td>{nf.modality}</td>
      <td>{nf.joint}</td>
      <td>{nf.type}</td>
      <td>{nf.direction}</td>
      <td>{nf.photos.mainPhoto}</td>

      <td>
       <Link href="/customexercise/[exercisedetailsId]" as={`/customexercise/${ex.id}`}>
   <a>add</a>
       </Link>
      </td>
    </tr>
  )
});
 return (<div>
   <h1>Schedule Diet</h1>
   <table className="table">
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
           Click to Add
         </th>
       </tr>
     </thead>
     <tbody>
     {exerciseList}
     </tbody>
   </table>
 </div>)}
 else
 return null;
}

listExercise.getInitialProps=async (context,client,currentUser)=>{
//console.log("exercise/list",currentUser);
//here is admin
if(currentUser)
    if(typeof window==="undefined"){
      
      //console.log("server  side");
      //   client.defaults.baseURL  ="http://localhost:3031/api-gateway/current-user/schedulenf";
      // const {data}=await client.get("",{headers: context.req.headers,});
      // client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      // return {data};

      
      const response=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include",headers: context.req.headers})
      const data=await response.json()
      return {data};
    }
    
    else{
      console.log("client  side");
        const response=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include"})
        const data=await response.json()
        return {data};
    }


}
export default listExercise;
