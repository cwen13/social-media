import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";

function MyPage() {
  
  const page = "MyPage"
  const { userId, blockedList } = useUserContext();
  
  const [ userPageId, setUserPageId ] = useState(userId);
  
  return(
    <section id="feedContainer">      
      <UserInfo id="userInfo"
				userPageId={userPageId}
				page={page}/>
      <Feed id="feed" page={page}/>      
    </section>
  );
};

export default MyPage;

