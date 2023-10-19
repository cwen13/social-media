import React from "react";

import ThoughtCreate from "./../ThoughtCreate"

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './../../utils/queries';

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
      
      <ThoughtCreate userId={props.userId} />
    </section>
  );
};

export default UserInfo;

