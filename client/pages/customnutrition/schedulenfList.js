import Head from "next/head";
import CardUi from "./CardUi";
import Router from "next/router";
import axios from "axios"
import CardDetails from "./CardDetails";
import DayTimesCard from "./dayTimesCard";
import {useState} from "react";
const scheduleeList=({schedulenf,onDietSchedule,deleteDayN,deleteFromDayN,id})=>{
	
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	
	const {document}=schedulenf[0];

	const [view,setView]=useState(false);
	const [detailView,setDetailView]=useState(false);
	const lastView=[];
	const [showDetailsCard,setShowDetailsCard]=useState([])
	const [showDayTimesCard,setShowDayTimesCard]=useState([])
	const dates=document.filter((level0)=>level0).map((level1)=>{return level1.sameDay})
	
	const days=document.filter((level0)=>level0).map((level1)=>{return level1.day})
	const lengthOfEachExercies=days.map((len)=>len.length)
	const dayTimes=days.filter((d)=>d).map((x)=>{return x.map((x2)=>{return x2.dayTime})});
	const dayTimeLength=days.filter((d)=>d).map((x)=>{return x.map((x2)=>{return x2.time.length})});
	
	
	
	
	const EnableCardDetailView=(e,ind)=>{
	
		//setShowDetailsCard(
			setShowDetailsCard( days[ind].filter((accessTime)=> {if (e===accessTime.dayTime)
				 {return (accessTime.time)}}).map((a)=>{
					return a.time.map((accessEachNutrition,ind)=>{return (<CardDetails index={ind} nutrition={ accessEachNutrition.nutrition} id={accessEachNutrition.sameNutrition} key={accessEachNutrition.nutrition+Math.random()} />)})
			}))
			
		setView(false)
		setDetailView(true)
		
	}
	const dayTimeDelete=async(time,ind)=>{
		
		try{
			console.log("dates",dates)
			const date=dates[ind].replace("-","").replace("-","");
			const response=await axios.delete(`http://localhost:3031/api-gateway/current-user/schedulenf/day/${id}/${date}/${time}`,{withCredentials:"include"});
			console.log("date",response.status)
			
		}
		catch(err){
			console.log("day time deleting: ",err)
		}
		


	}
	const EnableCardUIView=(e)=>{
		
		lastView.push(e);
		
		setShowDayTimesCard(dayTimes[e].map((d,ind)=>{return <DayTimesCard time={d}  onDelete={dayTimeDelete}length={dayTimeLength[e][ind]} EnableCardDetailView={EnableCardDetailView} value={e} key={d} />}))
		setView(true);
	}
	
	

	const onDelete=(e)=>{
		const varr=dates[e.target.value].replace("-","").replace("-","");
	console.log("ondelete",varr)
		if(deleteDayN(varr))
		{
			showCards.splice(e.target.value,1)
			
			Router.push("/schedules/listcards");
		}
	}
	const showCards=lengthOfEachExercies.map((arr,ind)=>{return <CardUi dayTimes={dayTimes[ind]} dayTimeLength={dayTimeLength[ind]} date={dates[ind]}  dayId={ind} EnableCardUIView={EnableCardUIView} onDelete={onDelete} len={arr} weekday={weekday} key={dates[ind]} />})
	
	const onBack=()=>{
		if(view===true) setView(false);
		else if(detailView) {
			setDetailView(false);
			setView(true)
		}
		else
		onDietSchedule()
	


	}

	

	
	


    return (<div>
       
        
        <div className="container-fluid">
		<div>
				<button type="button" onClick={onBack} className="btn btn-primary" style={{padding:"1%",backgroundColor:"white"}}><i className="fa fa-arrow-left fa-lg" style={{color:"blue"}}  aria-hidden="true" key="2back"></i></button>
			</div>
        <div className="row">
			
			
      
	
	{!view && !detailView &&showCards}
	{/* {view && showDetailsCard} */}
	{view && showDayTimesCard}
	{detailView &&showDetailsCard}
	
        </div>
        

        </div>
        <style jsx>
            {
                `
               
* { margin: 0px; padding: 0px; }
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
    </div>)
}



export default scheduleeList;