import React, { useState } from "react";

import UserInfo from "./../components/UserInfo";
import Feed from "./../components/Feed";
import Stats from "./../components/Stats";

function UserPage() {

  const page = "UserPage"
  
  return(
    <section className="userPage">      
      <ul>
	<li id="otherUserInfo">
	  <UserInfo page={page}/>
	  <Stats page={page}/>
	</li>
	<li>
	  <Feed page={page}/>
	</li>
      </ul>
      </section>
  );
};

export default UserPage;
