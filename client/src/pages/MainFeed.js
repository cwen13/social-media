import React from "react";
import Feed from "./../components/Feed/"
import RecentThoughts from "./../components/RecentThoughts/"
import UserInfo from "./../components/UserInfo";

const MainFeed = (props) => {
  return(
	<section className="mainFeed">
	  <ul>
	    <li> <UserInfo /> </li>
	    <li> <Feed /> </li>

	    <li> <RecentThoughts /> </li>
	  </ul>
	</section>
  );

};

export default MainFeed;
