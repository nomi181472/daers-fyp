import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios"
import buildClient from "../api/built-client";
import Headers from "../component/header";
import fetch from "isomorphic-unfetch"

const AppComponent = ({ Component, pageProps, currentUser }) => {

  return (
    <div>
      <Headers currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {

  let pageProps = {};
  
  if(typeof window==="undefined"){
    
   
    
    const response=await axios.get("/api/user/current-user",{credentials:"include"})
    console.log(respose)
    const data=await response.json()
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
    }
  
    return { pageProps, ...data };
  }
  
  else{
   
      const response=await axios("/api/user/current-user",{credentials:"include"})
      const data=await response.json()
      if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
      }
    
      return { pageProps, ...data };
  }

 
};
export default AppComponent;
