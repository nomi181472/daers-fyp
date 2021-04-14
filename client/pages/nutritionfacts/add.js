import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {useState} from "react";
import styles from "./upload.module.css";
import ImageUpload from "../../ui/Imageupload";
import axios from "axios";
const add=({currentUser})=>{
  // console.log(currentUser);
  if(currentUser){
    const [nutritionCategory,setNutritionCategory]=useState("");
    const [nutritionName,setNutritionName]=useState("");
    const [fats,setFats]=useState(0);
    const [carbohydrates,setCarbohydrates]=useState(0);
    const [protein,setProtein]=useState(0);
    const [calories,setCalories]=useState(0);
    const [photosUrl,setPhotosUrl]=useState([]);
    const [mainPhoto,setMainPhoto]=useState("");
    const [files, setFiles] = useState([]);
    
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
      console.log(res.data.url);

      setPhotosUrl([...photosUrl,res.data.url])
      setMainPhoto(res.data.url);
      
      
      
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
  const body={
    nutritionCategory,
    nutritionName,
    fats,
    carbohydrates,
    protein,
    calories,
    photos:{
      photosUrl:photosUrl,
      mainPhoto:mainPhoto
    }
  }
     const {doRequest,errors}=useRequest({
       url:`http://localhost:3030/api-gateway/current-user/nutritionfact`,
      method:"post",
      body:body
      ,
      onSuccess:(body)=>console.log('successFull nutrition created',body),
    })

 
  
const onClick=()=>{


  doRequest();
 
 


}  


const cancelMe=()=>{
  Router.push("/nutritionfacts/list");
}

return (
<div className="container-fluid">

<div className="row">
  <div className="container">
<div className="card-coulmns">

<div className="card-body ">
<h2 className="card-title ">Add Nutrition</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={nutritionName} onChange={(e)=>setNutritionName(e.target.value)} type="text"  /></td>
</tr>

    
<tr>   
<td className="card-text">Category</td>
<td className="card-text"><input value={nutritionCategory} onChange={(e)=>setNutritionCategory(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Fats</td>
<td className="card-text"><input value={fats} onChange={(e)=>setFats(e.target.value)} type="number" step="0.0"/></td>
</tr>
<tr>
<td className="card-text">Carbohydrates</td>
<td className="card-text"><input value={carbohydrates} onChange={(e)=>setCarbohydrates(e.target.value)} type="number" step="0.0" /></td>
</tr>

<tr>
<td className="card-text">Protein</td>
<td className="card-text"><input value={protein} onChange={(e)=>setProtein(e.target.value)} type="number" step="0.0"  /></td>
<td className="card-text">

</td>
</tr>
<tr>
<td className="card-text">Calories</td>
<td className="card-text"><input value={calories} onChange={(e)=>setCalories(e.target.value)} type="number" step="0.0"  /></td>
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
      <ImageUpload  files={files} onDrop={onDrop}/>
      <button onClick={upload}>Upload</button>
      
     
      
    </div>
    </div>
    </div>
<div>
  <div className="d-flex justify-content-center">
    <table>
      <tbody>
      <tr>
<td className="card-text"></td>
<td className="card-text text-right"><button onClick={onClick} className="btn btn-primary spaced">Add</button> </td>

</tr>
<tr>
<td className="card-text"></td>
<td className="card-text text-right"> <button onClick={cancelMe}className="btn btn-primary spaced">Cancel</button></td>

</tr>
      </tbody>
    </table>
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