import React from "react";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import UserInfo from "./../../components/UserInfo";

import "./style.css";

const MainFeed = (props) => {

  return(
	<section id="mainFeed">
	  <ul>
	    <li> <UserInfo /> </li>
	    <li id="feed"> <Feed /> </li>
	    <li> <RecentThoughts /> </li>
	  </ul>
	</section>
  );

};

export default MainFeed;
