import Router from "next/router";
import Link from "next/link";
import useRequest from "../../hooks/use-request";
import {useState} from "react";
const update=({data})=>{
   
  if(data )
  {
    const [firstName,setFirstName]=useState(data.firstName);
    const [lastName,setLastName]=useState(data.lastName);
    const [email,setEmail]=useState(data.email);
    const [age,setAge]=useState(data.age);
    const [weight,setWeight]=useState(data.weight);
    const [height,setHeight]=useState(data.height);
    const [bmi,setBmi]=useState(data.bmi);
    const [forBack,setForBack]=useState("Cancel");
    const [disable,setDisable]=useState(false);
    const [editOrConfirm,setEditOrConfirm]=useState("Confirm");
     const {doRequest,errors}=useRequest({
       url:`http://localhost:3010/api-gateway/current-user/user/${data.id}`,
      method:"put",
      body:{
        firstName,
        lastName,
        email,
        age,
        weight,
        height,
        bmi
      },
      onSuccess:()=>console.log('User successFull updated'),
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
  Router.push("/user/list");
}

return (
<div className="container  mt-0">

<div className="card-group">
<div className="card">
<h2 className="" >{data.photos.photosUrl}</h2>
<div className="card-body ">
<h2 className="card-title ">{ data.firtName}</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text"  disabled={disable} /></td>
</tr>
<tr>   
<td className="card-text">Last Name</td>
<td className="card-text"><input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text"  disabled={disable} /></td>
</tr>
<tr>   
<td className="card-text">Email</td>
<td className="card-text"><input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" disabled /></td>
</tr>
<tr>
<td className="card-text">Age</td>
<td className="card-text"><input value={age} onChange={(e)=>setAge(e.target.value)} type="number" step="0.01" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">Weight</td>
<td className="card-text"><input value={weight} onChange={(e)=>setWeight(e.target.value)} type="number" step="0.01" disabled={disable} /></td>
</tr>

<tr>
<td className="card-text">Height</td>
<td className="card-text"><input value={height} onChange={(e)=>setHeight(e.target.value)} type="text" step="0.01" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">BMI</td>
<td className="card-text"><input value={bmi} onChange={(e)=>setBmi(e.target.value)} type="text" step="0.01" disabled  /></td>
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
<style>
{
`
.mt-0 {
  margin-top: 20px !important;
}
.spaced{
  margin-left: 10px !important;
}
input[type="text"]:disabled {
  background: #dddddd;
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

update.getInitialProps=async (context,client,currentUser)=>{
//console.log("exercise/list",currentUser);
//here is admin
const {updateId}=context.query;
console.log("id",updateId);
if(currentUser)
    if(typeof window==="undefined"){
      
       // console.log("server  side");
        client.defaults.baseURL  =`http://localhost:3010/api-gateway/current-user/user/${updateId}`;
      //  console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      return {data};
    }
    
    else{
        const response=await fetch(`http://localhost:3010/api-gateway/current-user/user/${updateId}`,{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        return {data};
    }


}
export default update;
