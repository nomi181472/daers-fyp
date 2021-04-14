import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import Head from "next/head";
export default () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(18);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [BMI, setBMI] = useState(0);
  const [oHeight, setOHeight] = useState("Meters")
  const [inch,setInch]=useState(0)
  const [Oweight, setOWeight] = useState("Kilograms");
  const [password, setPassword] = useState("");
  const [passShow,setShowPass]=useState("password")
  let bmi=0;
  
  const handleHeighttF=(e)=>{
    if(oHeight==="FeetInches"){
      setHeight(parseFloat(e.target.value)*0.3048)
    }
    else{
      setHeight(0)
    }
   
  }
  const handleHeighttM=(e)=>{
    setHeight(parseFloat(e.target.value))
  }
  const handleHeighttI=(e)=>{
    if(oHeight==="FeetInches")
    {
      setInch(parseFloat(e.target.value)*0.0254)
    }
   
  }
  const handleWeight=(e)=>{
    if(Oweight==="Pounds")
    {
      setWeight(parseFloat(e.target.value)*0.453592)

    }
    else{
      setWeight(parseFloat(e.target.value))
    }
   
   
  }
  const { doRequest, errors } = useRequest({
    
    url: "http://localhost:3010/api-gateway/sign-up/user",
    method: "post",
    body: {
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = async (event) => {
    
    event.preventDefault();
    
   bmi=weight/Math.pow(height+inch,2)
     
    
    
   
   
    await doRequest(bmi);

   
  };
const  showPassword=()=>{
  console.log(passShow);
  if(passShow==="password"){
    setShowPass("text")

  }
  else
  {
    setShowPass("password")
  }
  }
  return (
   <div className="container-fuild">
     <Head>

     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
  
     </Head>
     <form className="form-control form-control-sm" onSubmit={onSubmit}>
     <h1>Signup</h1>
     
   <table className="table table-borderless table-responsive table-condensed table-hover">
   <tbody>
    
    
      
     <tr className="form-group">
        <td>First Name <i className="fa fa-user" aria-hidden="true"></i></td>
        <td>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
        />
        </td>
      </tr>
      <tr className="form-group">
        <td>Last Name <i className="fa fa-user" aria-hidden="true"></i></td>
      <td> <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
        />
        </td> 
      </tr>
      <tr className="form-group">
        <td>Email Address <i className="fa fa-envelope" aria-hidden="false"></i></td>
        <td>
       <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        </td>
      </tr>
      <tr className="form-group">
        <td>Age <i className="fa fa-calendar 18+" aria-hidden="true"></i></td>
        <td>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-control"
        />
        </td>
      </tr>
      <tr className="form-group">
      <td>Height <i className="fa fa-text-height" aria-hidden="true"></i></td>
      <td>
     
    
   
      <select  className="form-control" value={oHeight} onChange={(e)=>setOHeight(e.target.value)}><option value="FeetInches">Feet and Inches</option>
          <option value="Meters">Meters</option>
          </select>
      
      </td>
      
       <td>
       { oHeight==="Meters" &&<input
          type="number"
          step="0.0"
          style={{width:"60%"}}
          placeholder={oHeight}
         value={height}
          onChange={handleHeighttM}
          className="form-control"
        />}
       {oHeight==="FeetInches" &&<input
         type="number"
          step="0.0"
          style={{width:"60%"}}
          placeholder="feet"
      
          onChange={handleHeighttF}
          className="form-control"
        />}
        </td>
        <td>
         
       { oHeight==="FeetInches" &&<input
          type="number"
          step="0.0"
          style={{width:"60%"}}
          placeholder="Inches"
        
          onChange={handleHeighttI}
          className="form-control"
        />}

        </td>
      </tr>
      <tr className="form-group">
        <td>Weight <i className="fa fa-balance-scale" aria-hidden="true"></i></td>
        <td>
      <select  className="form-control" value={Oweight} onChange={(e)=>setOWeight(e.target.value)}><option value="Pounds">Pounds</option>
          <option value="Kilograms">Kilograms</option>
          </select>
      </td>
       <td>
        <input
          type="number"
          step="0.0"
          style={{width:"60%"}}
          placeholder={Oweight}
       
          onChange={handleWeight}
          className="form-control"
        />
      </td>
      </tr>
      
      <tr className="form-group">
        <td>Password <i className="fa fa-key" aria-hidden="true"></i></td>
        <td>
        <input
          value={password}
          
          onChange={(e) => setPassword(e.target.value)}
          type={passShow}
          className="form-control show_pass"
        />
        <input type="checkbox" onClick={showPassword}/>Show Password
        </td>
      </tr>
      
  
    </tbody>
    
    </table>
    
    {errors};<button className="btn btn-primary">Sign Up</button>
    </form>
    <style jsx>
{ `
tr:hover {background-color:#f5f5f5;}
td:hover {background-color:#f5f5fa;}

`}
    </style>
    </div>
  );
};
