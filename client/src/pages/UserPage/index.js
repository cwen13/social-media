import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import Stats from "./../../components/Stats";
import "./style.css";

function UserPage() {

  const page = "UserPage"
  
  return(
    <section id="userPage">      
      <ul className="userFeed">
	<li id="otherUserInfo">
	  <UserInfo page={page}/>
	  <Stats page={page}/>
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
      </section>
  );
};

export default UserPage;