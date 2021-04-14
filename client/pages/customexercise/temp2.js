import HrLine from "./HrLine";
const CardUi=()=>{
    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{"marginTop":"20px","marginLeft":"1px"}}>
        <div className="tile">
                    <div className="wrapper">
                        <div className="header">Event Title</div>

                        <div className="banner-img">
                            <img src="http://via.placeholder.com/640x360" alt="Image 1"/>
                        </div>

                        <div className="dates">
                            <div className="start">
                                <strong>STARTS</strong> 12:30 JAN 2015
                                <span></span>
                            </div>
                            <div className="ends">
                                <strong>ENDS</strong> 14:30 JAN 2015
                            </div>
                        </div>

                        <div className="stats">

                            <div>
                                <strong>INVITED</strong> 3098
                            </div>

                            <div>
                                <strong>JOINED</strong> 562
                            </div>

                            <div>
                                <strong>DECLINED</strong> 182
                            </div>

                        </div>

                        <div className="stats">

                            <div>
                                <strong>INVITED</strong> 3098
                            </div>

                            <div>
                                <strong>JOINED</strong> 562
                            </div>

                            <div>
                                <strong>DECLINED</strong> 182
                            </div>

                        </div>

                        <div className="stats">

                            <div>
                                <strong>INVITED</strong> 3098
                            </div>

                            <div>
                                <strong>JOINED</strong> 562
                            </div>

                            <div>
                                <strong>DECLINED</strong> 182
                            </div>

                        </div>

                        <div className="footer">
                            <a href="#" className="Cbtn Cbtn-primary">View</a>
                            <a href="#" className="Cbtn Cbtn-danger">Delete</a>
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