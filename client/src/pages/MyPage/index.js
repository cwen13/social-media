import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

function MyPage() {
  
  const page = "MyPage"
  
  return(
    <section id="feedContainer">      
      <UserInfo id="userInfo" page={page}/>
      <Feed id="feed" page={page}/>      
    </section>
  );
};

export default MyPage;
