import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from './../utils/queries';

import UserInfo from "./../components/UserInfo";
import UserFeed from "./../components/UserFeed";
import Stats from "./../components/Stats";

function UserProfile(props) {

  return(
    <section className="userPage">      
      <ul>
	<li id="userInfo">
	  <UserInfo userId={props.userId}
		    userName={props.userName}
		    firstName={props.firstName}
		    email={props.email} />
	</li>

	<li id="userStats">
	  <Stats user={props.userName} />
	</li>
	
	<li>
	  <UserFeed userId={props.userId} />
	</li>
      </ul>
      </section>
  );

};

export default UserProfile;
