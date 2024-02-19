import React from "react";
import Feed from "./../../components/Feed/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";
import Auth from "./../../utils/auth";

const MainFeed = () => {  

  const page = "MainFeed"
  
  return(
    <section id="feedContainer">
      {Auth.loggedIn ? <UserInfo page={page}/> : null }
      <Feed id="feed"  page={page}/>
    </section>
  );
};

export default MainFeed;
