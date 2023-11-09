import React, { useContext } from "react";
import { useQuery } from '@apollo/client';

import { QUERY_USER } from './../../utils/queries';
import ThoughtCreate from "./../ThoughtCreate"
import { UserContext } from "./../../utils/UserContext";
import "./style.css";

const UserInfo =  ( ) => {
  const {userId,setUserId} = useContext(UserContext);
  
  const { loading, error, data } = useQuery(QUERY_USER,
					     { variables: { userId }});

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  console.log("USERID:", userId);
  console.log(data);

  const renderLanding = () => {
    return (
      <section> LOGIN TO EXP </section>
    );
  };

  const renderUserInfo = () => {
    return (
      <section className="userInfo" >
	<h1>=^={data.getUser.userName}=^=</h1>
	<div className="pfp">
	  +==+<br/>
	  |--|<br/>
	  +==+
	</div>
	<div className="names">
	  NAME: {data.getUser.handle}
	</div>
	<div className="email">
	  EMAIL: {data.getUser.email}
	</div>
	{ (userId !== 0) ?
	  
      	  <ThoughtCreate userId={data.getUser.userId} /> :
	  <p>Sign up or login to start putting your best thougths out there!</p>}
      </section>
    );
  };
  
  return((data.getUser ==  null) ? renderLanding() : renderUserInfo());
};

export default UserInfo;



