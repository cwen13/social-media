import React, { useState } from "react";
import { useParams } from "react-router-dom";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

import { useUserContext } from "./../../utils/UserContext";

function UserPage() {

  const page = "UserPage"
  const { userId, blockedList } = useUserContext();

  const userPageId = useParams().userId
  const [ blocked, setBlocked ] = useState(userId !== userPageId && blockedList.filter(blockedUser => blockedUser.id === userPageId).length !== 0);

  return(
    <section id="feedContainer">      
      <UserInfo id="userInfo"
		page={page}
		blocked={blocked}
		setBlocked={setBlocked}/>
      <Feed id="feed"
	    page={page}
	    blocked={blocked}/>
    </section>
  );
};

export default UserPage;
