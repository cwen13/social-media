import React from "react";
import { useLocation } from "react-router-dom";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import UserInfo from "./../../components/UserInfo";

import "./style.css";

const MainFeed = () => {  
  return(
	<section id="mainFeed">
	  <ul className="mainPage">
	    <li id="userInfo">
	      <UserInfo page="MainFeed"/>
	    </li>
	    <li id="feed">
	      <Feed page="MainFeed"/>
	    </li>
	  </ul>
	</section>
  );
};

export default MainFeed;
