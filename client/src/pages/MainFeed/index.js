import React from "react";
import { useLocation } from "react-router-dom";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import Stats from "./../../components/Stats";
import UserInfo from "./../../components/UserInfo";
import "./style.css";

const MainFeed = () => {  

  const page = "MainFeed"

  return(
	<section id="mainFeed">
	  <ul className="mainPage">
	    <li id="feed">
	      <Feed page={page}/>
	    </li>
	  </ul>
	</section>
  );
};

export default MainFeed;
