import React, { useState } from 'react';
import styles from "./upload.module.css";
import ImageUpload from "../../ui/Imageupload";
import axios from 'axios';

const photoUpload = () => {
  const [files, setFiles] = useState([]);
 
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }
 
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
      
    }
    catch(err){
      
       console.log(err)
    }
      
    })
  }
 
  return (
    <div className={styles.App}>
      <ImageUpload files={files} onDrop={onDrop}/>
      <button onClick={() => upload()}>Upload</button>
      
     
      
    </div>
    
  );
}
 
export default photoUpload;