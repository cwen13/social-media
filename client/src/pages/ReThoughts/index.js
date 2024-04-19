import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import { QUERY_MY_LIKED } from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";
import Auth from "./../../utils/auth";

const ReThoughts = () => {
  if(!Auth.loggedIn()) window.location.assign("/Mainfeed");
  const page = "UserReThoughts"
  const userPageId = parseInt(useParams().userId)
  
  return(
    <section id="feedContainer">
      <UserInfo id="userInfo"
		userPageId={userPageId}
		page={page}/>
      <Feed id="feed"
	    userPageId={userPageId}
	    page={page}/>
    </section>
  );
};

export default ReThoughts;
