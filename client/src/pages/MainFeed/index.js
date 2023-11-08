import React from "react";
import { useLocation } from "react-router-dom";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import UserInfo from "./../../components/UserInfo";

import { UserContext } from "./../../utils/UserContext";

import "./style.css";

const MainFeed = () => {
  
  return(
	<section id="mainFeed">
	  <ul className="mainPage">
	    <li id="userInfo">
	      <UserInfo />
	    </li>
	    <li id="feed">
	      <Feed />
	    </li>
	  </ul>
	</section>
  );

};

export default MainFeed;
