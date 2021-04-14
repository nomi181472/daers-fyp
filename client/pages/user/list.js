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
  const response= await axios.delete(`http://localhost:3010/api-gateway/current-user/user/${e.target.value}`,{withCredentials:"include"})
 if(response.status===200){
  Router.push("list");
 }
 
}
//console.log(data);
if(data){
  
exerciseList=data.user.map(u=>{
  return (
    <tr key={u.id}>
      <td>{u.firstName}</td>
      <td>{u.lastName}</td>
      <td>{u.email}</td>
      <td>{u.age}</td>
      <td>{u.photos.photosUrl}</td>
      <td>
       <Link href="/user/[updateId]" as={`/user/${u.id}`}>
   <a className="btn btn-primary  active form-group" role="button" aria-pressed="true">Update</a>
       </Link>
      </td>
    <td><button value={u.id}  onClick={deleteIt} className="btn btn-primary active form-group">Delete</button></td>
    </tr>
  )
});
 return (
 <div className='container-fluid'>
   <div className="col-xs-3">
  <h1>User</h1>
  <div className="table-responsive">
 
  <table className="table table-striped">
    <thead>
      <tr>
      <th>
          First Name
        </th>
        <th>
          Last Name
        </th>
        <th>
          Email
        </th>
        <th>
          Age
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
      
        console.log("server  side");
        client.defaults.baseURL  ="http://localhost:3010/api-gateway/current-user/userlist";
       // console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      //console.log(data);
      return {data};
    }
    
    else{
        const response=await fetch("http://localhost:3010/api-gateway/current-user/userlist",{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        //console.log(data);
        return {data};
    }


}
export default list;
