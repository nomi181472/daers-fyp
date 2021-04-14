import Router from "next/router";
import Link from "next/link";
import axios from "axios"
import styles from "./upload.module.css";
import ImageUpload from "../../ui/Imageupload";
import useRequest from "../../hooks/use-request";
import {useState} from "react";
const update=({data})=>{
   
  if(data)
  {
    const [exerciseCategory,setExerciseCategory]=useState(data.exerciseCategory);
    const [exerciseName,setExerciseName]=useState(data.exerciseName);
    const [level,setLevel]=useState(data.level);
    const [joint,setJoint]=useState(data.joint);
    const [type,setType]=useState(data.type);
    const [modality,setModality]=useState(data.modality);
    const [direction,setDirection]=useState(data.direction);
    const [forBack,setForBack]=useState("Cancel");
    const [disable,setDisable]=useState(false);
    const [files, setFiles] = useState([]);
    const [photosUrl,setPhotosUrl]=useState(data.photos.photosUrl);
    const [mainPhoto,setMainPhoto]=useState(data.photos.mainPhoto);
    const [editOrConfirm,setEditOrConfirm]=useState("Confirm");
    const upload = () => {
      const uploadURL = 'https://api.cloudinary.com/v1_1/dhqfhpemf/image/upload';
      const uploadPreset = 'vpxyox0m';
   
      files.forEach(async(file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        try{
       const res=await axios({
          url: uploadURL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: formData
        })
        setPhotosUrl([...photosUrl,res.data.url])
        setMainPhoto(res.data.url);
        console.log(res.data.url);
      }
      catch(err){
        
         console.log(err)
      }
        
      })
    }
   

    const onDrop = (acceptedFiles) => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
     const {doRequest,errors}=useRequest({
       url:`http://localhost:3020/api-gateway/current-user/exercise/${data.id}`,
      method:"put",
      body:{
       exerciseCategory,
       exerciseName,
       level,
       type,
       joint,
       direction,
       modality,
       photos:{
        photosUrl:photosUrl,
        mainPhoto:mainPhoto
       }
      },
      onSuccess:()=>console.log('successFull'),
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
  Router.push("/exercises/list");
}
        

console.log(data.photos)
return (
<div className="container  mt-0">

<div className="card-group">
<div className="card">
<div className="card-columns">
  <div class="card align-center" style={{width:"100%"}}>
    <img class="card-img-top" src={data.photos.mainPhoto}alt="Card image" style={{width:"100%"}}/>
    </div>
    
    </div>
    
    
<h2 className="" ></h2>
<div className="card-body ">
<h2 className="card-title ">{ data.exerciseName}</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={exerciseName} onChange={(e)=>setExerciseName(e.target.value)} type="text"  disabled={disable} /></td>
</tr>
<tr>   
<td className="card-text">Category</td>
<td className="card-text"><input value={exerciseCategory} onChange={(e)=>setExerciseCategory(e.target.value)} type="text" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">Type</td>
<td className="card-text"><input value={type} onChange={(e)=>setType(e.target.value)} type="text" disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">Joint</td>
<td className="card-text"><input value={joint} onChange={(e)=>setJoint(e.target.value)} type="text" disabled={disable} /></td>
</tr>

<tr>
<td className="card-text">Direction</td>
<td className="card-text"><input value={direction} onChange={(e)=>setDirection(e.target.value)} type="text"  disabled={disable} /></td>
</tr>
<tr>
<td className="card-text">Modality</td>
<td className="card-text"><input value={modality} onChange={(e)=>setModality(e.target.value)} type="text" disabled={disable}  /></td>
</tr>
<tr>
<td className="card-text">Level</td>
<td className="card-text"><input value={level} onChange={(e)=>setLevel(e.target.value)} type="text" disabled={disable} /></td>
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
<div className="card-body" style={{width:400}}>
<div className={styles.App} >
      <ImageUpload files={files} onDrop={onDrop}/>
      <button onClick={upload}>Upload</button>
      
     
      
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

const {updateId}=context.query;

if(currentUser)
    if(typeof window==="undefined"){
      
      
        client.defaults.baseURL  =`http://localhost:3020/api-gateway/current-user/exercise/${updateId}`;
     
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      return {data};
    }
    
    else{
        const response=await fetch(`http://localhost:3020/api-gateway/current-user/exercise/${updateId}`,{credentials:"include"})
        const data=await response.json()
        
        return {data};
    }


}
export default update;
