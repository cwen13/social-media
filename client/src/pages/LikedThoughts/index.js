import React from "react";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import { QUERY_MY_LIKED } from "./../../utils/queries";
import { useParams } from "react-router-dom";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";


const LikedThoughts = () => {
  
  const page = "Liked";
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

export default LikedThoughts;
