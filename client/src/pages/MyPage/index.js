import React, { useState } from "react";

import MyProfile from "./../../components/MyProfile";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

function MyPage() {

  const page = "MyPage"
  
  return(
    <section id="feedContainer">      
      <ul className="userFeed">
	<li id="myUserInfo">
	  <MyProfile page={page}/>
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
      </section>
  );
};

export default MyPage;
