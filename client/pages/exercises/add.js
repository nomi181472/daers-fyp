import Router from "next/router";
import useRequest from "../../hooks/use-request";
import styles from "./upload.module.css";
import ImageUpload from "../../ui/Imageupload";
import axios from "axios";
import {useState} from "react";
const add=({currentUser})=>{
  // console.log(currentUser);
  if(currentUser){
    const [exerciseCategory,setExerciseCategory]=useState("");
    const [exerciseName,setExerciseName]=useState("");
    const [level,setLevel]=useState("");
    const [joint,setJoint]=useState("");
    const [type,setType]=useState("");
    const [modality,setModality]=useState("");
    const [direction,setDirection]=useState("");
    const [files, setFiles] = useState([]);
    const [photosUrl,setPhotosUrl]=useState([]);
    const [mainPhoto,setMainPhoto]=useState("");
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
      setPhotosUrl(photosUrl=>[...photosUrl,res.data.url])
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
       url:`http://localhost:3020/api-gateway/current-user/exercise`,
      method:"post",
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
      onSuccess:(photosUrl)=>console.log(photosUrl),
    })

 
  
const onClick=()=>{
doRequest();

}  


const cancelMe=()=>{
  Router.push("/exercises/list");
}

return (
<div className="container-fluid">

<div className="row">
  <div className="container">
<div className="card-coulmns">
<div className="card-body ">
<h2 className="card-title ">Add Exercise</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={exerciseName} onChange={(e)=>setExerciseName(e.target.value)} type="text"  /></td>
</tr>
<tr>   
<td className="card-text">Category</td>
<td className="card-text"><input value={exerciseCategory} onChange={(e)=>setExerciseCategory(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Type</td>
<td className="card-text"><input value={type} onChange={(e)=>setType(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Joint</td>
<td className="card-text"><input value={joint} onChange={(e)=>setJoint(e.target.value)} type="text" /></td>
</tr>

<tr>
<td className="card-text">Direction</td>
<td className="card-text"><input value={direction} onChange={(e)=>setDirection(e.target.value)} type="text"   /></td>
<td className="card-text">

</td>
</tr>
<tr>
<td className="card-text">Modality</td>
<td className="card-text"><input value={modality} onChange={(e)=>setModality(e.target.value)} type="text"   /></td>
</tr>
<tr>
<td className="card-text">Level</td>
<td className="card-text"><input value={level} onChange={(e)=>setLevel(e.target.value)} type="text"  /></td>
</tr>
<tr>
<td className="card-text">{errors}</td>

</tr>






</tbody>
</table>
</div>

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
<div >
<div className="d-flex justify-content-center">
      <table>
        <tbody>
      <tr>
 
<td className="card-text "><button onClick={onClick} className="btn btn-primary spaced">Add</button> </td>

</tr>
<tr>

<td className="card-text "> <button onClick={cancelMe}className="btn btn-primary spaced">Cancel</button></td>

</tr>
</tbody>  </table>

    </div>
</div>

</div>


)
}
else {
  return null
}
}
add.getInitialProps=(context,client,currentUser)=>{
  return currentUser
}




export default add;