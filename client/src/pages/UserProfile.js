import React from "react";

import UserInfo from "./../components/UserInfo";
import UserFeed from "./../components/UserFeed";
import Stats from "./../components/Stats";

function UserProfile() {
  return(
    <section className="userPage">      
      <ul>
	<li> <UserInfo /> </li>
	<li> <UserFeed /> </li>
	<li> <Stats /> </li>
      </ul>
      </section>
  );

};

export default UserProfile;
