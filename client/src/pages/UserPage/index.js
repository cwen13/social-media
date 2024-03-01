import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  QUERY_USER,
} from "./../../utils/queries";
import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

import { useUserContext } from "./../../utils/UserContext";

function UserPage() {

  const page = "UserPage"
  const userPageId = parseInt(useParams().userId)
  
  return(
    <section id="feedContainer">
      <UserInfo id="userInfo"
		page={page}
		userPageId={userPageId}
      />
      <Feed id="feed"
	    page={page}
	    userPageId={userPageId}
      />
    </section>
  );
};

export default UserPage;


