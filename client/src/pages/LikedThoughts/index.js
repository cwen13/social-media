import React from "react";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import { QUERY_MY_LIKED } from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";


const LikedThoughts = () => {
  
  const page = "Liked";
  
  return(
    <section id="feedContainer">      
      <ul className="userFeed">
	<li id="userInfo">
	  <UserInfo page={page}/>
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
    </section>
  );
};

export default LikedThoughts;
