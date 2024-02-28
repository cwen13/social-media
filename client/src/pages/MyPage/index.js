import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";

function MyPage() {
  
  const page = "MyPage"
  
  return(
    <section id="feedContainer">      
      <UserInfo id="userInfo"
		userPageId={localStorage.getItem("user_id")}
		page={page}
      />
      <Feed id="feed"
	    page={page}
	    userPageId={localStorage.getItem("user_id")}
      />
    </section>
  );
};

export default MyPage;

