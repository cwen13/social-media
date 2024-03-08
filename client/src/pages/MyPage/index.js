import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";
import { useUserContext } from "./../../utils/UserContext";

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
  } = useUserContext();

  let userId = localStorage.getItem("user_id");  
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
      />
    </section>
  );
};

export default MyPage;

