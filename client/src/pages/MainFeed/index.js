import React from "react";
import Feed from "./../../components/Feed/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";
import Auth from "./../../utils/auth";
const MainFeed = () => {  

  const { userId } = useUserContext();
  
  const page = "MainFeed"

  if(!Auth.loggedIn) {
	userId = 1;
  }

  return(
    <section id="feedContainer">
      {userId !== 0 ? <UserInfo id={userId}
								userPageId={userId}
								page={page}/> : ""}
      <Feed id="feed"  page={page}/>
    </section>
  );
};

export default MainFeed;
