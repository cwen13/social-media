import React, { useState } from "react";

import UserInfo from "./../components/UserInfo";
import Feed from "./../components/Feed";
import Stats from "./../components/Stats";

function UserProfile() {

  const page = "UserProfile"
  
  return(
    <section className="userProfile">      
      <ul>
	<li id="userInfo">
	  <UserInfo page={page}/>
	  <Stats page={page} />
	</li>
	<li>
	  <Feed page={page}/>
	</li>
      </ul>
      </section>
  );

};

export default UserProfile;
