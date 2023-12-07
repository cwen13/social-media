import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import { QUERY_MY_LIKED } from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import Stats from "./../../components/Stats";
import Feed from "./../../components/Feed";

const ReThoughts = () => {

  const page = "MyReThoughts"
  
  return(
    <section id="userPage">      
      <ul className="userFeed">
	<li id="otherUserInfo">
	  <UserInfo page={page}/>
	  <Stats page={page}/>
	</li>
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
    </section>
  );
};

export default ReThoughts;
