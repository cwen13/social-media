// main page to look around at other's thoughts
import React from "react";
import {Row, Col, Container } from 'react-bootstrap';
import Feed from "./../components/Feed/"
import RecentThoughts from "./../components/RecentThoughts/"
import UserInfo from "./../components/UserInfo";

const MainFeed = () => {
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
