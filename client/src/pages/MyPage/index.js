import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import Stats from "./../../components/Stats";
//import "./style.css";

function MyPage() {

  const page = "MyPage"
  
  return(
    <section id="myPage">      
      <ul className="userFeed">
	<li id="myUserInfo">
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

export default MyPage;
