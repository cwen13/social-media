import React, { useState } from "react";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import { QUERY_MY_LIKED } from "./../../utils/queries";
import { useParams } from "react-router-dom";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import Auth from "./../../utils/auth";

const LikedThoughts = () => {
  if(!Auth.loggedIn()) window.location.assign("/Mainfeed");
  const page = "Liked";
  const userPageId = parseInt(useParams().userId)

  const {
    blockedList,
    setBlockedList
  } = useUserContext();

  let userId = localStorage.getItem("user_id");
  
  const [ blocked, setBlocked ] = useState(userId !== userPageId
					   && blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0);
  
  return(
    <section id="feedContainer">      
      <UserInfo id="userInfo"
		userPageId={userPageId}
		page={page}
		blocked={blocked}
		setBlocked={setBlocked}
      />
      <Feed id="feed"
	    userPageId={userPageId}
	    page={page}
	    blocked={blocked}
	    setBlocked={setBlocked}
      />
    </section>
  );
};

export default LikedThoughts;
