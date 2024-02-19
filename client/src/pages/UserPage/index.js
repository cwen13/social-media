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
  const { userId, blockedList } = useUserContext();
  const [ userPageId, setUserPageId ] = useState(parseInt(useParams().userId));
  const [ blocked, setBlocked ] = useState(false);
  const [ user, setUser ] = useState({});
  
  const {lodaing: userLoading, error: userError, data: userData} = useQuery(
      QUERY_USER,
      {
		variables :
		{
		  userId: userPageId
		}
      }
  );
  
  useEffect(() => {
	if(!userLoading && !userError&& userData !== undefined) {
	  setUser(
		  {
			...user,
			id: userData.getUser.id,
			userName: userData.getUser.userName,
			handle: userData.getUser.handle,
			email: userData.getUser.email,
			profilePicture: userData.getUser.profilePicture
		  }
	  )
	}
  }, [userLoading, userError, userData]);
  
  if(userLoading) return "Loading...";
  if(userData === undefined) return "loading...";

  return(
      <section id="feedContainer">
		<UserInfo id="userInfo"
				  page={page}
				  blocked={blocked}
				  setBlocked={setBlocked}
				  userPageId={userPageId}
				  id={user.id}
				  userName={user.userName}
				  handle={user.handle}
				  email={user.email}
				  profilePicture={user.profilePicture}

		/>
		
		<Feed id="feed"
			  page={page}
		/>
      </section>
  );
};

export default UserPage;



	  
