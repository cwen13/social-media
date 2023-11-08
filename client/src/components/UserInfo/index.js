import React, { useContext } from "react";

import { useQuery } from '@apollo/client';
import { QUERY_USER } from './../../utils/queries';

import ThoughtCreate from "./../ThoughtCreate"

import { UserContext } from "./../../utils/UserContext";

import "./style.css";

const UserInfo =  ( ) => {

  const { userId, setUserId } = useContext(UserContext);

  const { loading, error, data } =  useQuery(QUERY_USER,
    {variables: { userId }
    });

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  console.log(data);
  
  return(
    <section className="userInfo" >
      USER INFO
      	<ThoughtCreate userId={userId} /> :
	<p>Sign up or login to start putting your best thougths out there!</p>}
    </section>
  );
};

export default UserInfo;


//      <h1>=^={data.user.userName}=^=</h1>
//      <div className="pfp">
//	+==+<br/>
//	|--|<br/>
//	+==+
//      </div>
//      <div className="names">
//	NAME: {data.user.handle}
//      </div>
//      <div className="email">
//	EMAIL: {data.user.email}
//      </div>
//      { (userId !== 0) ?

