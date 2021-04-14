console.log("inside error2",);
      const res = await fetch("http://localhost:3010/api-gateway/current-user/user",{ credentials: 'include'})
    const resp = await res.json()
  
     
      if(resp.errors)
      {
        console.log("nesting try catch with errors");
        return {pageProps, currentUser:null}
      }
      else{
        console.log("nesting try catch without errors");
        console.log(resp);
        return {pageProps, currentUser:resp.currentUser}
      }