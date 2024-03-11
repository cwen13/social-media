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

  let userId = localStorage.getItem("user_id");
  
  const page = "MainFeed"

  const userPageId = parseInt(useParams().userId)
  const [ blocked, setBlocked ] = useState(userId !== userPageId
					   && blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0);

  useEffect(() => {
    (blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0)
      ? setBlocked(true)
      : setBlocked(false);
    if(page !== "UserPage") setBlocked(false);
  }, [blockedList])

  
  return(
    <section id="feedContainer">
      {Auth.loggedIn()
       ? <UserInfo page={page}
		   userPageId={localStorage.getItem("user_id")}
		   block={blocked}
		   setBlocked={setBlocked}
	 />
       : "" }
      <Feed id="feed"
	    page={page}
	    userPageId={userPageId}
	    blocked={blocked}
	    setBlocked={setBlocked}
      />
      
    </section>
  );
};

export default MainFeed;
