import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './../../utils/queries';

import ThoughtCreate from "./../ThoughtCreate"

import "./style.css";

const UserInfo = (props) => {
  
  return(
    <section className="userInfo" >
      <h1>=^={props.userName}=^=</h1>
      <div className="pfp">
	+==+<br/>
	|--|<br/>
	+==+
      </div>
      <div className="names">
	NAME: {props.firstName}
      </div>
      <div className="email">
	EMAIL: {props.email}
      </div>
      
      <ThoughtCreate userId={props.userId}
		     submission={props.submission} />
    </section>
  );
};

export default UserInfo;

