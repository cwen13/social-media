import React from "react";
import Feed from "./../../components/Feed/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";

const MainFeed = () => {  

  const { userId } = useUserContext();
  
  const page = "MainFeed"

  return(
    <section id="feedContainer">
      {userId !== 0 ? <UserInfo id="userInfo" page={page}/> : ""}
      <Feed id="feed"  page={page}/>
    </section>
  );
};

export default MainFeed;
