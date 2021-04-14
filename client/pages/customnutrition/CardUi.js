
import {useState} from "react"
const CardUi=({date,weekday,len,EnableCardUIView,onDelete,dayId,dayTimes,dayTimeLength})=>{
	
	var t = new Date(date);
	var today=new Date().getTime();
	var tTime=t.getTime();
	


	
	const when=tTime<today?"Ended At:":"Starts At:";
	var d = new Date(date);
  
	
	const onViewTo=(e)=>{
	
		
		EnableCardUIView(e.target.value)
	}


    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{"marginTop":"20px","marginLeft":"1px"}}>
        <div className="tile">
                    <div className="wrapper">
					
                        <div className="dates">
                            <div className="start">
	<strong style={{color:"black"}}>{when}</strong> 
                                <span></span>
                            </div>
                            <div className="start">
	<strong style={{color:"black"}}>{d.getDate()} { weekday[d.getDay()]} {d.getFullYear()}</strong>
                            </div>
                        </div>

                        <div className="stats">

                            <div>
                                <strong style={{color:"black"}}>Today Nutrition</strong> {len}
                            </div>

                            <div>
							<strong style={{color:"black"}}>Done</strong> 0
                            </div>

                            <div>
							<strong style={{color:"black"}}>Left</strong> 0
                            </div>

                        </div>
<div className="stats">

                            <div>
	<strong style={{color:"black"}}>{dayTimes.length&&dayTimes[0]}</strong> {dayTimeLength.length&&dayTimeLength[0]}
                            </div>

                            <div>
							<strong style={{color:"black"}}>{dayTimes.length>=1&&dayTimes[1]}  </strong> {dayTimeLength.length>=1&&dayTimeLength[1]}
                            </div>

                            <div>
								<strong style={{color:"black"}}>{dayTimes.length>=3&&dayTimes[2]} </strong>{dayTimeLength.length>=2&&dayTimeLength[2]}
                            </div>

                        </div>

                      

                        
                        <div className="footer">
                        <button  onClick={onViewTo} value={dayId} className="btn btn-primary" style={{padding:"4%"}}>View</button>
						<button  onClick={onDelete} value={dayId} className="btn btn-danger" style={{padding:"4%"}}>Delete</button>
                     
                        </div>
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
            </div>
    )
}

export default CardUi