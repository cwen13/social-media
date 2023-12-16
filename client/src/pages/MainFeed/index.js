import React from "react";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";

const MainFeed = () => {  

  const page = "MainFeed"

  return(
    <section id="feedContainer">
      <ul className="mainPage">
	<li id="otherUserInfo">
	  <UserInfo page={page}/>
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
    </section>
  );
};

export default MainFeed;
