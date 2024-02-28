import React from "react";
import { useParams } from "react-router-dom";
import Feed from "./../../components/Feed/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";
import Auth from "./../../utils/auth";

const MainFeed = () => {  

  const page = "MainFeed"
  return(
    <section id="feedContainer">
      {Auth.loggedIn()
       ? <UserInfo page={page}
		   userPageId={localStorage.getItem("user_id")}/>
       : "" }
      <Feed id="feed"
	    page={page}/>
    </section>
  );
};

export default MainFeed;
