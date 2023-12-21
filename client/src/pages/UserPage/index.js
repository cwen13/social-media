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

  console.log("BLOCKED:",blocked);				   

  return(
    <section id="feedContainer">      
      <ul className="userFeed">
	<li id="userInfo">
	  <UserInfo page={page}
		    blocked={blocked}
		    setBlocked={setBlocked}/>
	</li>
	<li id="feed">
	  <Feed page={page}
		blocked={blocked}/>
	</li>
      </ul>
    </section>
  );
};

export default UserPage;
