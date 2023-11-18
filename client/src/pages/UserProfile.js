import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from './../utils/queries';

import UserInfo from "./../components/UserInfo";
import Feed from "./../components/Feed";
import Stats from "./../components/Stats";

function UserProfile() {

  return(
    <section className="userPage">      
      <ul>
	<li id="userInfo">
	  <UserInfo page="UserProfile"/>
	  <Stats />
	</li>
	<li>
	  <Feed page="UserProfile"/>
	</li>
      </ul>
      </section>
  );

};

export default UserProfile;
