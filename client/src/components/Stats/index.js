import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import {
  QUERY_ME,
  QUERY_USER_FRIENDS,
} from './../../utils/queries';
import { ADD_FRIEND } from "./../../utils/mutations";
import Following from "./../Following";
import FriendList from "./../FriendList";
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

//Stats will include friend indicator, link to liked,
//  reThoughts, and 
const Stats = ({ page }) => {
  const { userId,
	  loginUser,
	  logoutUser,
	  userName,
	  handle,
	  profilePicture,
	  email
	} = useUserContext();
  let userPage = useParams().userId
  userPage = (userPage !== undefined) ? userPage : userId;
  const [ friendship, setFriendship ] = useState(false);

  const { loading: friendsLoading, data: friendsData, error: friendsError } = useQuery(
    QUERY_USER_FRIENDS,
    {
      variables: {
	userId: userPage
      }
    }
  );
  
  if (friendsLoading) return "Loading....";

  return(
    <>
      {(page === "MainFeed") ? "" :
       <ul className="userStats">

	 <li>Number of friends 
	   {/*This will be a mini scroll box likely a iframe*/}
	   <ul id="friendList">
	     {friendsData ? friendsData.getUserFriends.map(friend =>
	       <FriendList friendId={friend.id}
			   key={friend.id}
			   friendName={friend.userName}
			   page={page}
	       />)
		 : "There are no friends yet"}
	   </ul>
	 </li>
	 
      <li>Following
	{/*This will be a mini scroll box likely a iframe*/}
	<Following userId={userId} />
	<Link to={`/user/${userId}/friend`}
	      state={{ userId: userId,
		       userName: userName }}
	>
	  See everyone you follow
	</Link>
      </li>
      
      <li>
	<Link to={`/user/${userId}/liked`}
	      state={{ userId: userId,
		       userName: userName }}
	>
	  Liked thoughts
	</Link>
      </li>
      
      <li>
	<Link to={`/user/${userId}/reThoughts`}
	      state={{ userId: userId,
		       userName: userName }}
	>
	  Link to reThoughts
	</Link>
      </li>
      
      <li>
	<Link to={`/user/${userId}/blocked`}
	      state={{ userId: userId,
		       userName: userName }}
	>
	  Blocked
	</Link>
      </li>
      
    </ul>
      }
    </>
  );
};

export default Stats;
