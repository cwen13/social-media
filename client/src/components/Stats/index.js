import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MY_FRIENDS } from './../../utils/queries';

import Following from "./../Following";
import FriendList from "./../FriendList";

import { useUserContext } from "./../../utils/UserContext";

import "./style.css";

//Stats will include friend indicator, link to liked,
//  reThoughts, and 
const Stats = (props) => {
  const { userId, loginUser, logoutUser } = useUserContext();

  const myInfo = useQuery(QUERY_ME);
  const friendsQuery = useQuery(QUERY_MY_FRIENDS);

  
  return(
      <ul className="userStats">
	<li>Number of friends {friendsQuery.length}
	  {/*This will be a mini scroll box likely a iframe*/}
	  <FriendList friends={friendsQuery.data} />
	</li>

	<li>Following
	  {/*This will be a mini scroll box likely a iframe*/}
	  <Following userId={userId} />
	  <Link to={`/${userId}/following`}
		state={{ userId: userId,
			 userName: myInfo.userName }}>See everyone you follow</Link>
	</li>
	
	<li>
	  <Link to={`/${userId}/liked`}
		state={{ userId: userId,
			 userName: myInfo.userName }}>Liked thoughts</Link>
      </li>

      <li>
	<Link to={`/${userId}/reThoughts`}
	      state={{ userId: userId,
		       userName: myInfo.userName }}>Link to reThoughts</Link>
      </li>

      <li>
	<Link to={`/${userId}/blocked`}
	      state={{ userId: userId,
		       userName: myInfo.userName }}>Blocked</Link>
      </li>

      <li>
	<Link to="">Edit profile -make a drop down</Link>
      </li>
    </ul>
  );
};
    
export default Stats;
