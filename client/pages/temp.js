import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/built-client";
import Headers from "../component/header";
import axios from "axios";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  //console.log(currentUser);
  return (
    <div>
      <Headers currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log(Object.keys(appContext));
 // console.log(appContext);
  let pageProps = {};
  try {
    const { data } = await buildClient(appContext.ctx).get("user", {
      withCredentials: true,
    });

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
    }
    //console.log(pageProps);
    return { pageProps, ...data };
  } catch (err) {
    // if (appContext.Component.getInitialProps) {
    //   pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx));
    // }
    try {
    const response = await axios.get(
      "http://localhost:3010/api-gateway/current-user/user",
      { withCredentials: true }
    );
    const data = { currentUser: response.data };
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
    }
    return { pageProps, ...data };
    }
    catch(err)
    {

      console.log("inside error2",);
      //console.log(err);
      return {pageProps, currentUser:null}
    }
   
    
  }
};
export default AppComponent;
