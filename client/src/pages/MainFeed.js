// main page to look around at other's thoughts
import React from "react";
import {Row, Col, Container } from 'react-bootstrap';
import Feed from "./../componets/Feed/"
import RecentThoughts from "./../componets/RecentThoughts/"

const MainFeed = () => {
  return(
	<Container fluid>
	  <Row>
	    <Col> <UserInfo /> </Col>
	    <Col> <Feed /> </Col>
	    <Col> <RecentThoughts /> </Col>
	  </Row>
	</Container>
  );

};

export default MainFeed;
