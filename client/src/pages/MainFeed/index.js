import React, { useState } from "react";
import Feed from "./../../components/Feed/"
import RecentThoughts from "./../../components/RecentThoughts/"
import UserInfo from "./../../components/UserInfo";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './../../utils/queries';

import "./style.css";

const MainFeed = (props) => {
  const { loading, error, data } = useQuery(QUERY_ME);

  let userMe;
  
  if ((typeof data === "undefined") || (data.me === null)) {
    userMe = { id: 0,
	       userName: "Luky",
	       firstName:"Lucky",
	       email:"licky@we.com" };
  } else {
    userMe = data.me;
  }
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  
  return(
	<section id="mainFeed">
	  <ul className="mainPage">
	    <li id="userInfo"> <UserInfo userId={userMe.id}
					 userName={userMe.userName}
					 firstName={userMe.firstName}
					 email={userMe.email} />
	    </li>
	    <li id="feed"> <Feed userId={userMe.id}g /> </li>
	  </ul>
	</section>
  );

};

export default MainFeed;
