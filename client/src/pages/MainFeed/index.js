import React, { useState,  useEffect } from "react";
import { useParams } from "react-router-dom";
import Feed from "./../../components/Feed/"
import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";
import Auth from "./../../utils/auth";

const MainFeed = () => {  

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

  const userId = localStorage.getItem("user_id");
  const page = "MainFeed"

  const [ recentThought, setRecentThought ] = useState(
    {
      thought:"THIS SESSION, STARTED!",
      userId: userId,
      fromPage: "This one",
      createdAt: Date.now(),
      postType: "thought"
    }
  );
  
  const userPageId = parseInt(useParams().userId)
  const [ blocked, setBlocked ] = useState(userId !== userPageId
					   && blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0);

  useEffect(() => {
    (blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0)
      ? setBlocked(true)
      : setBlocked(false);
    if(page !== "UserPage") setBlocked(false);
  }, [blockedList])

  useEffect(() => {
    console.log("RECENT THOUGHT:", recentThought.thought);
  }, [recentThought]);
  
  return(
    <section id="feedContainer">
      {Auth.loggedIn()
       &&
       <UserInfo page={page}
		 userPageId={localStorage.getItem("user_id")}
		 block={blocked}
		 setBlocked={setBlocked}
 		 recentThought={recentThought}
		 setRecentThought={setRecentThought}
       />}
      <Feed id="feed"
	    page={page}
	    userPageId={userPageId}
	    blocked={blocked}
	    setBlocked={setBlocked}
	    recentThought={recentThought}	    
	    setRecentThought={setRecentThought}
      />      
    </section>
  );
};

export default MainFeed;

