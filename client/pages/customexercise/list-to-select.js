import Link from "next/link";
const listExercise=({data,scheduleId})=>{
    //console.log(data);
    
let exerciseList;
if(data){
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
       <Link  href="/customexercise/[exercisedetailsId]" as={`/customexercise/${ex.id}/?${scheduleId}`}>
   <a className="btn btn-primary  active form-group">add</a>
       </Link>
      </td>
    </tr>
  )
});
 return (<div>
   <h1>Exercises</h1>
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
 const {scheduleId}=context.query
if(currentUser)
    if(typeof window==="undefined"){
      
        console.log("server  side");
        client.defaults.baseURL  ="http://localhost:3020/api-gateway/current-user/exercise";
       // console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      return {data,scheduleId};
    }
    
    else{
        const response=await fetch("http://localhost:3020/api-gateway/current-user/exercise",{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        return {data,scheduleId};
    }


}
export default listExercise;
