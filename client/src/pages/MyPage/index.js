import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import { useQuery } from "@apollo/client";
import {
  QUERY_ALL_THOUGHTS,
  QUERY_USER_THOUGHTS,
  QUERY_MY_LIKED,
  QUERY_USER_LIKED,
  QUERY_USER_RETHOUGHTS,
  QUERY_ALL_RETHOUGHT_IDS,
  QUERY_ALL_REPLY_IDS,
  QUERY_MY_BLOCKED_USERS
} from "./../../utils/queries";
import { useUserContext } from "./../../utils/UserContext";
import ThoughtPost from "./../../components/Posts/ThoughtPost";
import "./../MainStyles/style.css";

function MyPage() {  
  const page = "MyPage"

  const {
    blockedList,
    setBlockedList,
    friendList,
    setFriendList,
    followList,
    setFollowList,
    pendList,
    setPendList,
    likedList,
    setLikedList
  } = useUserContext();

  let userId = localStorage.getItem("user_id");  
  const userPageId = parseInt(useParams().userId)
  const [ blocked, setBlocked ] = useState(userId !== userPageId
					   && blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0);
  const queryOptions = {
    MyPage : QUERY_USER_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
    Liked: QUERY_USER_LIKED,
    UserReThoughts: QUERY_USER_RETHOUGHTS
  }

  const thoughts = {
    MyPage : "getUserThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
    Liked: "getUserLiked",
    UserReThoughts: "getUserReThoughts"
  };
  
  useEffect(() => {
    (blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0)
      ? setBlocked(true)
      : setBlocked(false);
  }, [blockedList])
  
  return(
    <section id="feedContainer">
      <UserInfo id="userInfo"
		userPageId={localStorage.getItem("user_id")}
		page={page}
		blocked={blocked}
		setBlocked={setBlocked}		
      />
      <Feed id="feed"
	    page={page}
	    userPageId={userPageId}
	    blocked={blocked}
	    setBlocked={setBlocked}
	    userId={userId}
      />      
    </section>
  );
};

export default MyPage;


