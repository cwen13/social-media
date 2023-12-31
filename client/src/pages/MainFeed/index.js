import React from "react";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";

const MainFeed = () => {  

  const page = "MainFeed"

  return(
    <section id="feedContainer">
      <UserInfo id="userInfo" page={page}/>
      <Feed id="feed"  page={page}/>
    </section>
  );
};

export default MainFeed;
