import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import {
  QUERY_ME,
  QUERY_MY_FRIENDS,
} from './../../utils/queries';
import Following from "./../Following";
import FriendList from "./../FriendList";
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

//Stats will include friend indicator, link to liked,
//  reThoughts, and 
const Stats = (props) => {
  const { userId, loginUser, logoutUser } = useUserContext();
  const { loading: myInfoLoading, data: myInfoData, error: myInfoError } = useQuery(QUERY_ME);
  const { loading: friendsLoading, data: friendsData, error: friendsError } = useQuery(QUERY_MY_FRIENDS);
    
  if (friendsLoading) return "Loading....";
  if (myInfoLoading) return "Loading....";

  return(
    <ul className="userStats">

      <li>Number of friends 
	{/*This will be a mini scroll box likely a iframe*/}
	<ul id="friendList">
	{friendsData.getMyFriends.map(friend => <FriendList friendId={friend.id}
							    friendName={friend.userName}
							    key={friend.id}/> ) }
	</ul>
      </li>
      
      <li>Following
	{/*This will be a mini scroll box likely a iframe*/}
	<Following userId={userId} />
	<Link to={`/user/${userId}/friend`}
	      state={{ userId: userId,
		       userName: myInfoData.userName }}
	>
	  See everyone you follow
	</Link>
      </li>
      
      <li>
	<Link to={`/user/${userId}/liked`}
	      state={{ userId: userId,
		       userName: myInfoData.userName }}
	>
	  Liked thoughts
	</Link>
      </li>
      
      <li>
	<Link to={`/user/${userId}/reThoughts`}
	      state={{ userId: userId,
		       userName: myInfoData.userName }}
	>
	  Link to reThoughts
	</Link>
      </li>
      
      <li>
	<Link to={`/user/${userId}/blocked`}
	      state={{ userId: userId,
		       userName: myInfoData.userName }}
	>
	  Blocked
	</Link>
      </li>
      
      <li>
	<Link to="">Edit profile
	</Link>
      </li>
    </ul>
  );
};

export default Stats;
