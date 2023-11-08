import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_MY_FRIENDS } from './../../utils/queries';

import Following from "./../Following";
import FriendList from "./../FriendList";

//Stats will include friend indicator, link to liked,
//  reThoughts, and 
const Stats = (props) => {
  const friendsQuery = useQuery(QUERY_MY_FRIENDS);
  
    
  return(
    <>
      <h3> Stats for {props.userName}</h3>
      <ul>

	<li>Number of friends {friendsQuery.length}
	  {/*This will be a mini scroll box likely a iframe*/}
	  <FriendList friends={friendsQuery.data} />
	</li>

	<li>Following
	  {/*This will be a mini scroll box likely a iframe*/}
	  <Following userId={props.userId} />
	  <Link to={`/${props.userId}/following`}
		state={{ userId: props.userId,
			 userName: props.userName }}>See everyone you follow</Link>
	</li>
	
	<li>
	  <Link to={`/${props.userId}/liked`}
		state={{ userId: props.userId,
			 userName: props.userName }}>Liked thoughts</Link>
      </li>

      <li>
	<Link to={`/${props.userId}/reThoughts`}
	      state={{ userId: props.userId,
		       userName: props.userName }}>Link to reThoughts</Link>
      </li>

      <li>
	<Link to={`/${props.userId}/blocked`}
	      state={{ userId: props.userId,
		       userName: props.userName }}>Blocked</Link>
      </li>

      <li>
	<Link to="">Edit profile -make a drop down</Link>
      </li>
    </ul>
    </>    
  );
};
    
export default Stats;
