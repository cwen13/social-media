import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import Stats from "./../../components/Stats";
import "./style.css";

function UserProfile() {

  const page = "UserProfile"
  
  return(
    <section id="userProfile">      
      <ul className="userFeed">
	<li id="userInfo">
	  <UserInfo page={page}/>
	  <Stats page={page} />
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
      </section>
  );

};

export default UserProfile;
