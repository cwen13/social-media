import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  QUERY_USER,
} from "./../../utils/queries";
import Auth from "./../../utils/auth";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

import { useUserContext } from "./../../utils/UserContext";

function UserPage() {
  if(!Auth.loggedIn()) window.location.assign("/Mainfeed");
  
  const {
    blockedList,
    setBlockedList,
    friendList,
    setFriendList,
    followList,
    setFollowList,
    pendList,
    setPendList,
  } = useUserContext();

  let userId = localStorage.getItem("user_id");
  
  const page = "UserPage"
  const userPageId = parseInt(useParams().userId)
  const [ blocked, setBlocked ] = useState(userId !== userPageId
					   && blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0);

  useEffect(() => {
    (blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0)
      ? setBlocked(true)
      : setBlocked(false);
  }, [blockedList])

  
  return(
    <section id="feedContainer">
      <UserInfo id="userInfo"
		page={page}
		userPageId={userPageId}
		blocked={blocked}
		setBlocked={setBlocked}
      />
      <Feed id="feed"
	    page={page}
	    userPageId={userPageId}
	    blocked={blocked}
	    setBlocked={setBlocked}
      />
    </section>
  );
};

export default UserPage;


