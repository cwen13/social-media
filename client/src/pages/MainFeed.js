// main page to look around at other's thoughts
import React from "react";
import {Row, Col, Container } from 'react-bootstrap';
import Feed from "./../components/Feed/"
import RecentThoughts from "./../components/RecentThoughts/"
import UserInfo from "./../components/UserInfo";

const MainFeed = () => {
  return(
<<<<<<< Updated upstream
	<Container fluid>
	  <Row>
	    <Col> <UserInfo /> </Col>
	    <Col> <Feed /> </Col>
	    <Col> <RecentThoughts /> </Col>
	  </Row>
	</Container>
=======
	<section className="mainFeed">
	  <ul>
	    <li> <UserInfo /> </li>
	    <li> <Feed /> </li>
	    <li> <RecentThoughts /> </li>
	  </ul>
	</section>
>>>>>>> Stashed changes
  );

};

export default MainFeed;
