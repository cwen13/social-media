import React, { useContext } from "react";
import { useQuery } from '@apollo/client';

import { QUERY_USER } from './../../utils/queries';
import ThoughtCreate from "./../ThoughtCreate"
import { UserContext, useUserContext } from "./../../utils/UserContext";
import "./style.css";

const UserInfo =  ( ) => {

  const { userId, setUserId } = useUserContext();

  const { loading, error, data } =  useQuery(QUERY_USER,
					     { variables: { userId }});

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  console.log("USERID:", userId);
  console.log(data);
  
  return(
    <section className="userInfo" >
     <h1>=^={data.userName}=^=</h1>
      <div className="pfp">
	+==+<br/>
	|--|<br/>
	+==+
      </div>
      <div className="names">
	NAME: {data.handle}
      </div>
      <div className="email">
	EMAIL: {data.email}
      </div>
      { (userId !== 0) ?

      	<ThoughtCreate userId={userId} /> :
	<p>Sign up or login to start putting your best thougths out there!</p>}
    </section>
  );
};

export default UserInfo;



