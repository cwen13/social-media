import React, { useState } from "react";

import MyProfile from "./../../components/MyProfile";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

function MyPage() {
  
  const page = "MyPage"
  
  return(
    <section id="feedContainer">      
      <MyProfile id="userInfo" page={page}/>
      <Feed id="feed" page={page}/>      
    </section>
  );
};

export default MyPage;
