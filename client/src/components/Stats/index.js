import React, { useState } from "react";
import { Link } form "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_FRIENDS } from './../../utils/queries';

//Stats will include friend indicator, link to liked,
//  reThoughts, and 
const Stats = (props) => {
  const friendsQuery = useQuery(QUERY_FRIENDS);
  
  
  
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
	  <Link to="/:userId/following">See everyone you follow</Link>
	</li>
	
	<li>
	  <Link to="/:userId/likes">Liked thoughts</Link>
      </li>

      <li>
	<Link to="/:userId/reThoughts">Link to reThoughts</Link>
      </li>

      <li>
	<Link to="/:userId/blocked">Blocked</Link>
      </li>

      <li>
	<Link to="">Edit profile -make a drop down</Link>
      </li>
    </ul>
    </>    
  );
};
    
export default Stats;
