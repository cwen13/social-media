import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

function UserPage() {

  const page = "UserPage"
  
  return(
    <section id="feedContainer">      
      <ul className="userFeed">
	<li id="userInfo">
	  <UserInfo page={page}/>
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
    </section>
  );
};

export default UserPage;
