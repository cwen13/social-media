import React, { useState } from "react";
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
const Stats = (props) => {
  const  userPage = useParams().userId;
  const { userId, loginUser, logoutUser } = useUserContext();

  const [ friendship, setFriendship ] = useState(false);
  
  let friendId = userId;
  if (userPage !== undefined) {
    friendId = (userId === userPage) ? userId : userPage;
  }
  
  const { loading: myInfoLoading, data: myInfoData, error: myInfoError } = useQuery(QUERY_ME);
  const { loading: friendsLoading, data: friendsData, error: friendsError } = useQuery(
    QUERY_USER_FRIENDS,
    {variables: { userId: friendId}}
  );

  const [ friendshipRequest, { error: friendAddError } ] = useMutation(ADD_FRIEND);
  
  const isFriend = () => {
    if (!friendship) {
      let friends = friendsData.getUserFriends.map(result => result.id);
      return friends.includes(userId);
    }
  };

  
  if (friendsLoading) return "Loading....";
  if (myInfoLoading) return "Loading....";

  const handleFriendship = async (event) => {
    console.log("SEND FRIEND REQUEST");
    await friendshipRequest({
      variables: {
	userId: userId,
	friendId: userPage
      }});
    setFriendship(true);
  }
  
  const friendButton = (event) => {
    return (isFriend()) ?
      <li>
	This one of your friends
      </li>
      :
      <li> This is not a friend but could be
	<button id="friendshipButton"
		onClick={handleFriendship}>
	  Friendship?
	</button>
    </li>
  };
  
  
  return(
    <ul className="userStats">
      {((userId === userPage) || (userPage === undefined)) ? "" : friendButton() }

      <li>Number of friends 
	{/*This will be a mini scroll box likely a iframe*/}
	<ul id="friendList">
	  {friendsData ? friendsData.getUserFriends.map(friend => <FriendList friendId={friend.id}
									      key={friend.id}
									      friendName={friend.userName}
									      page={props.page}
								  />)
	   : "There are no friends yet"}
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
