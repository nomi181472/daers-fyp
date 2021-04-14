

const Card=({schedulenf,schedulee,onDietSchedule,onExerciseSchedule,createSchedule,createScheduleNf,addMoreEx,addMoreNF})=>{
  const isExerciseSchedule=schedulee?true:false;
  const isDietSchedule=schedulenf?true:false;
  const onAddMoreEx=()=>{
    addMoreEx()
  }
  const   onAddMoreNF=()=>{
    addMoreNF()
  }
 
  const onCreate=()=>{
   // console.log("clickme")
    createSchedule()
  }
  const onCreateNf=()=>{
    console.log("clickme")
    createScheduleNf()
  }
    return(<div>
      
        <div className="flex justify-center" style={{margin:"5%"}}>
        <div className="mx-auto card bg-light">
        <div className="card-columns mx-auto d-flex justify-content-center col-12">
        <div className="container pa0 flex justify-center">
        
          {isExerciseSchedule &&<div className="card-body">
          <strong>    <h5 className="card-title">Exercise Schedule</h5></strong>
    <p className="card-text">Your total upcoming workouts: <strong>{schedulee[0].document.length}</strong></p>
    <button onClick={onExerciseSchedule} className="btn btn-primary form-control"> View </button>
  <div className="card-body">  <button onClick={onAddMoreEx} className="btn btn-primary form-control" style={{backgroundColor:"white",color:"#007bff"}}> AddMore+</button></div>
            </div>}
            {!isExerciseSchedule &&
            <div className="card-body">
            <h5 className="card-title">Create Exercise Schedule</h5>
  <p className="card-text"> You can create your Exercise schedule here..</p>
  <button onClick={onCreate} className="btn btn-primary">Create Schedule</button>
  
            
          </div>

            }
          
            <div className="vl" style={{"border-left": "6px solid gray",
  "height": "auto"}}></div>

{ isDietSchedule&&<div className="card-body">
              <h5 className="card-title">Diet Schedule</h5>
              <p className="card-text">Your total upcoming workouts: <strong>{schedulenf[0].document.length}</strong></p>
              <button onClick={onDietSchedule} className="btn btn-primary form-control" >View</button>
              <div className="card-body">  <button onClick={onAddMoreNF} className="btn btn-primary form-control" style={{backgroundColor:"white",color:"#007bff"}}> AddMore+</button></div>
            </div>
            
            }
            { !isDietSchedule&&<div className="card-body">
              <h5 className="card-title">Create Diet Schedule</h5>
              <p className="card-text">You can create Diet schedule here..</p>
              <button onClick={onCreateNf} className="btn btn-primary form-control">Create Schedule</button>
            </div>}
          </div>
       </div>
        
    
</div>
        
        </div>
    </div>
    )
}
Card.getInitialProps=()=>{
  console.log("running")
}
export default Card;