import Link from "next/link";
import Head from "next/head"
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart=(url)=>{
  console.log(url);
  NProgress.start();
}
Router.onRouteChangeComplete=()=>{
  NProgress.done();
}
Router.OnRouteChangeError=()=>NProgress.done();

export default ({ currentUser }) => {
  //console.log("header",currentUser);
  const links = [
    !currentUser && {
      label: "sign Up",
      href: "/auth/signup",
    },
    !currentUser && {
      label: "sign in",
      href: "/auth/signin",
    },
    
    currentUser && {
      label: "Users",
      href: "/user/list",
    },
    currentUser && {
      label: "Nutrition",
      href: "/nutritionfacts/list",
    },
    
  
    currentUser && {
      label: "Schedules",
      href: "/schedules/listcards",
    },
    currentUser && {
      label: "Exercise",
      href: "/exercises/list",
    },
    currentUser && {
      label: "sign out",
      href: "/auth/signout",
    },
    
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <div>
      <Head>
        <title>DAERS</title>
      
      </Head>
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">DAERS</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center"> {links}</ul>
      </div>
    </nav>
    </div>
  );
};
