
import Router  from "next/router";

import { PieChart } from 'react-minimal-pie-chart';
import React, { useState, useEffect } from "react";

import * as d3 from "d3";

import PieSVG from "./piechart";



import useRequest from "../../hooks/use-request";
import fetch from "isomorphic-unfetch";
const nutritionDetails=({nf})=>{
if(nf )
  {
	
	
	var date = new Date();
	
     const [sameDay, setSameDay] = useState( date.toISOString().substring(0, 10));
     const [discription,setDiscription]=useState([]);
	 const [fats,setFats]=useState(nf.fats);
	 const [url,setUrl]=useState("");
	 const [method,setMethod]=useState("");
	 const [scheduleId,setScheduleId]=useState("");
    const [carbohydrates,setCarbohydrates]=useState(nf.carbohydrates);
    const [photos,setPhotos]=useState(nf.photos.mainPhoto);
    const [protein,setProtein]=useState(nf.protein);
	const [calories,setCalories]=useState(nf.calories);
	const [grams,setGrams]=useState(100);
	const	[View,setView]=useState(false);
    const [dayTime,setDayTime]=useState("BreakFast");
   
    const showPhotos=nf.photos.mainPhoto?nf.photos.mainPhoto:"http://via.placeholder.com/640x360";
    const showName=nf.nutritionName?nf.nutritionName:"tempName";
   
 
    const nutrition={
      nutritionName:nf.nutritionName,
      nutritionCategory:nf.nutritionCategory,
      fats:fats,
      carbohydrates:carbohydrates,
      protein:protein,
      calories:calories,
      discription:[discription],
      photos:photos

    }
    const time=[{
      sameNutrition:nf.id,
      nutrition:nutrition
    }]
   const day= [{
    dayTime:dayTime,
    time:time,
        
        

    }]
    const document=[{
      sameDay:sameDay,
      day:day
      
	}];
	
	
	
	
	const setSchedule=async()=>{
		const resnf=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include"})
		const data=await resnf.json();
		console.log('data',data.schedulenf.length);
		if(data.schedulenf.length)
	{	
		setScheduleId(data.schedulenf[0].id)
	}

		if(scheduleId)
		{
			console.log("inisde")
		  setUrl("http://localhost:3031/api-gateway/current-user/schedulenf/"+data.schedulenf[0].id)
		  setMethod("put")
		  
		}
		else
		{
		  
			setUrl("http://localhost:3031/api-gateway/current-user/nutritionschedule")
		  setMethod("post")
		 
		}
	}
	setSchedule();

	console.log("data",method,url);
           const {doRequest,errors}=useRequest({
             url:url,
            method:method,
            body:{
              document:document
            },
            onSuccess:()=>console.log('temp'),
          })

		  const onClick=()=>{
  doRequest()
  if(!scheduleId)
        {
           Router.push("/schedules/listcards")
		}
		else
		{
			Router.push("/customnutrition/list-to-select")
		}

}
const cancelMe=()=>{
  Router.push("/customnutrition");
}
const handleDiscripton=(e)=>{
  if(e.target.value)
  setDiscription(e.target.value);
  else
  setDiscription(" ");
};




const handleGram=(val,cat)=>{
	if(cat==="f")
	{
		setProtein(parseFloat(((nf.protein/100)*val).toFixed(2)))
		setCarbohydrates(parseFloat(((nf.carbohydrates/100)*val).toFixed(2)))
	}
	if(cat==="c")
	{
		setFats(parseFloat(((nf.fats/100)*val).toFixed(2)))
		setProtein(parseFloat(((nf.protein/100)*val).toFixed(2)))
	}
	if(cat==="p")
	{
		setCarbohydrates(parseFloat(((nf.carbohydrates/100)*val).toFixed(2)))
		setFats(parseFloat(((nf.fats/100)*val).toFixed(2)))
	}
	
}

const handleProtein=(e)=>{
	
	setProtein(parseFloat(e.target.value));
	handleGram((parseFloat(e.target.value)/nf.protein)*100,"p")
	
}
const handleFats=(e)=>{
	
	setFats(parseFloat(e.target.value));
	handleGram((parseFloat(e.target.value)/nf.fats)*100,"f")
	
}
const handleCarbohydrate=(e)=>{

	setCarbohydrates(parseFloat(e.target.value));
	handleGram((parseFloat(e.target.value)/nf.carbohydrates)*100,"c")
	
}
const generateData=()=>{
	
	return (
		[{date: 0, value: fats},
	 	{date: 1, value: protein},
	 	{date: 2, value: carbohydrates}]

	
	)
}
const change=()=>{
	setCalories((4*(carbohydrates+protein))+(9*(fats)))

	setData(generateData());
	setGrams((parseFloat(protein)/nf.protein)*100)
	setView(true)
	
}
const [data, setData] = useState(generateData(0));
useEffect(() => {
	
	
	setData(generateData());
  }, [!data]);


	  return(
		  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 " style={{"marginTop":"2px","marginLeft":"1px","marginLeft":"10%"}}>
		  <div className="tile">
					  <div className="wrapper">
    <div className="header">{showName}</div>
  
						  <div className="banner-img">
							  <img src={showPhotos} style={{"width":"200px","height":"200px"}}alt="Image 1"/>
						  </div>
  
						  <div className="dates">
							  <div className="start ">
								  <strong style={{color:"black",fontSize:"150%"}}>Calories</strong>
								  <span></span>
							  </div>
							  <div className="ends">
								  <strong style={{color:"black",fontSize:"150%"}}>{!View&&(nf.calories)}{View&&(calories)}</strong> 
							  </div>
						  </div>

              
  
						  <div className="stats">
  
							  <div >
								  <strong style={{fontSize:"110%"}}>Protein</strong> {nf.protein}
							  </div  >
  
							  <div >
								  <strong style={{fontSize:"110%"}}>Carbohydrates</strong> {nf.carbohydrates}
							  </div>
  
							  <div>
								  <strong style={{fontSize:"110%"}}>Fats</strong> {nf.fats}
							  </div>
  
						  </div>
						  <div className="stats">
  
 
  <div>
	  <strong style={{fontSize:"110%"}}>Date</strong> 
  </div>
 
  <div>
	  <strong style={{fontSize:"110%"}}><input value={sameDay} className="form-control" type="date"onChange={(e)=>{setSameDay(e.target.value)}} /></strong> 
  </div>
  
  
</div>

<div className="stats">
  
 
  <div>
	  <strong style={{fontSize:"110%"}}>DayTime</strong> 
  </div>
 

  <div>
		<select className="form-control" value={dayTime} onChange={(e)=>{setDayTime(e.target.value)}}>
		<option value="Breakfast">Breakfast</option>
		<option value="Lunch">Lunch</option>
		<option value="Dinner">Dinner</option>
		</select>
  </div>
  
</div>
			 
		<div className="d-flex justify-content-center" >				  
    <div className="App">
      

     
      <div>
        <span className="label">{grams.toFixed(2)} gms</span>
        <PieSVG
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
     
    </div>
  
  </div>
  
						  <div className="stats form-group">
						  <div>
								  <strong>Fats</strong><input  onChange={handleFats} value={fats} type="number" style={{widht:"2%"}}/>
							  </div>
							  <div>
								  <strong>Protein</strong><input  onChange={handleProtein} value={protein} type="number" style={{widwidht:"2%"}}/>
							  </div>
							  <div>
								  <strong>Carbohydrates</strong> <input onChange={handleCarbohydrate}value={carbohydrates} type="number" style={{widht:"2%"}}/>
							  </div>
							 
							  
						  </div>
						  <div className="d-flex justify-content-center" >
  <button className="btn btn-primary" onClick={change}>Confirm Changes</button>
  </div>
						  <div className="footer">
						  <button className="btn btn-primary" style={{padding:"4%"}} onClick={onClick}>Confirm</button>
						  <button className="btn btn-danger" style={{padding:"4%"}} onClick={cancelMe}>Cancel</button>
						  </div>
					  </div>
					  
				  </div> 
				  <style jsx>
			  {
				  `
				 
  * { margin: 0px; padding: 0px; }
  .App {
	
	text-align: center;
  }
  
  span {
	margin: 20px;
  }
  
  .label {
	display: inline-block;
	width: 120px;
  }
  body {
	  background: #ecf1f5;
	  font:14px "Open Sans", sans-serif; 
	  text-align:center;
  }
  
  .tile{
	  width: 100%;
	  background:#fff;
	  border-radius:5px;
	  box-shadow:0px 2px 3px -1px rgba(151, 171, 187, 0.7);
	  float:left;
		transform-style: preserve-3d;
		margin: 10px 5px;
  
  }
  
  .header{
	  border-bottom:1px solid #ebeff2;
	  padding:19px 0;
	  text-align:center;
	  color:#59687f;
	  font-size:600;
	  font-size:19px;	
	  position:relative;
  }
  
  .banner-img {
	  padding: 5px 5px 0;
  }
  
  .banner-img img {
	  width: 100%;
	  border-radius: 5px;
  }
  
  .dates{
	  border:1px solid #ebeff2;
	  border-radius:5px;
	  padding:20px 0px;
	  margin:10px 20px;
	  font-size:16px;
	  color:#5aadef;
	  font-weight:600;	
	  overflow:auto;
  }
  .dates div{
	  float:left;
	  width:50%;
	  text-align:center;
	  position:relative;
  }
  .dates strong,
  .stats strong{
	  display:block;
	  color:#adb8c2;
	  font-size:11px;
	  font-weight:700;
  }
  .dates span{
	  width:1px;
	  height:40px;
	  position:absolute;
	  right:0;
	  top:0;	
	  background:#ebeff2;
  }
  .stats{
	  border-top:1px solid #ebeff2;
	  background:#f7f8fa;
	  overflow:auto;
	  padding:15px 0;
	  font-size:16px;
	  color:#59687f;
	  font-weight:600;
	  border-radius: 0 0 5px 5px;
  }
  .stats div{
	  border-right:1px solid #ebeff2;
	  width: 33.33333%;
	  float:left;
	  text-align:center
  }
  
  .stats div:nth-of-type(3){border:none;}
  
  div.footer {
	  text-align: right;
	  position: relative;
	  margin: 20px 5px;
  }
  
  div.footer a.Cbtn{
	  padding: 10px 25px;
	  background-color: #DADADA;
	  color: #666;
	  margin: 10px 2px;
	  text-transform: uppercase;
	  font-weight: bold;
	  text-decoration: none;
	  border-radius: 3px;
  }
  
  div.footer a.Cbtn-primary{
	  background-color: #5AADF2;
	  color: #FFF;
  }
  
  div.footer a.Cbtn-primary:hover{
	  background-color: #7dbef5;
  }
  
  div.footer a.Cbtn-danger{
	  background-color: #fc5a5a;
	  color: #FFF;
  }
  
  div.footer a.Cbtn-danger:hover{
	  background-color: #fd7676;
  }
				  `
			  }
		  </style>
			  </div>
	  )
  }
  else{
    return null;
  }
}
nutritionDetails.getInitialProps=async(context,client,{currentUser})=>{
	// let scheduleId;
	// if(context.asPath[context.asPath.length-1]==="?")
	// {
	//   scheduleId=""
	// }
	// else{
	//   scheduleId=context.asPath.substring(context.asPath.length-24,context.asPath.length-1)
	// }
	 	 
  
   const {scheduledetailsid}=context.query;
   
  
  if(currentUser){
  if( typeof window ==="undefined"){
 const response=await fetch(`http://localhost:3030/api-gateway/current-user/nutritionFact/${scheduledetailsid}`,{ credentials: 'include',headers: context.req.headers});

   const nf=await response.json()
 
   return {nf:nf};
  }
   else
  {
    
    const res = await fetch(`http://localhost:3030/api-gateway/current-user/nutritionFact/${scheduledetailsid}`,{ credentials: 'include'})
    const nf = await res.json()
    return {nf:nf,};
  }}
  return {nf:null,};;
  

}

  export default nutritionDetails