// main page to look around at other's thoughts
import React from "react";
import {Row, Col, Container } from 'react-bootstrap';
import Feed from "./../components/Feed/"
import RecentThoughts from "./../components/RecentThoughts/"
import UserInfo from "./../components/UserInfo";

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
