import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  QUERY_MY_FRIENDS,
  QUERY_MY_PENDING_REQUESTS,
  GET_MY_NOTIFICATIONS,
} from "./../../utils/queries";
import {
  REMOVE_FRIEND,
  REMOVE_FOLLOW,
  ADD_FOLLOW,
  SEND_FRIEND,
  DENY_FRIEND_REQUEST,
  APPROVE_FRIEND_REQUEST,
  ADD_BLOCKED,
  REMOVE_BLOCKED,
} from "./../../utils/mutations";
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const FollowingUserEntry = (props) => {
  const page = "FollowingList";
  
  const { userId,
	  followList,
	  setFollowList,
	  friendList,
	  setFriendList,
	  blockedList,
	  setBlockedList } = useUserContext();

  const isFriend = (followingId) => friendList.filter((user) => user.id === followingId).length === 1;
  const isFollowing = (followId) => followList.filter((user) => user.id === followId).length === 1;
  const isBlocked = (blockedId) => blockedList.filter((user) => user.id === blockedId).length === 1;
  
  const [ friendship, setFriendship ] = useState(isFriend(props.followingId));
  const [ following, setFollowing ] = useState(isFollowing(props.followingId));
  const [ blocked, setBlocked ] = useState(isBlocked(props.followingId));

  const [ friendRemove, { error: friendRemoveError } ] = useMutation(
    REMOVE_FRIEND,
  );
  
  const [ followAdd, { error: followAddError } ] = useMutation(
    ADD_FOLLOW,
  );
  
  const [ followRemove, { error: followRemoveError } ] = useMutation(
    REMOVE_FOLLOW,
  );
  
  const [ blockAdd, { error: blockAddError } ] = useMutation(
    ADD_BLOCKED,
  );
  
  const [ blockRemove, { error: blockRemoveError } ] = useMutation(
    REMOVE_BLOCKED
  );

  
  useEffect(() => {
    setFriendship(isFriend(props.followingId))
    setFollowing(isFollowing(props.followingId))
    setBlocked(isBlocked(props.followingId))     	  
  }, [])

  
  //-------------------
  //-----FOLLOW-BUTTON-
  //------------------- 
  const handleFollowing = async (event) => {
    event.preventDefault();
    if(isFollowing(props.followingId)) {
      await followRemove(
	{
	  variables:
	  {
	    followingId: props.followingId
	  }
	}
      );
      setFollowing(false);
      setFollowList(
	[
	  ...followList.filter(follow => follow.id !== props.followingId)
	]
      );
    } else {
      await followAdd(
	{
	  variables:
	  {
	    followingId: props.followingId
	  }
	}
      );
      setFollowing(true);
      setFollowList(
	[
	  ...followList,
	  {
	    id: props.followingId,
	    userName: props.followingName,
	    handle: props.followingHandle,
	    profilePicture: props.followingProfilePicture
	  }
	]
      );
    };
  };
  
  const RenderFollowing = () => {
    return(
      <div className="followingship">
	{isFollowing(props.followingId)
	 ? <button id="followButton"
		   onClick={handleFollowing}>
	     UnFollow
	     </button>
	    : <button id="followButton"
		      onClick={handleFollowing}>
 		Follow
	      </button>
	   
	}
	
      </div>
    );
  };
  
  //----------------------
  //-------BLOCKED-BUTTON-
  //----------------------
  const handleBlocked = async (event) => {
    event.preventDefault();
    if (isBlocked(props.followingId)) {
      await blockRemove(
	{
	  variables:
	  {
	    blockedId: props.followingId
	  }
	}
      );
      setBlocked(false);
      setBlockedList(
	[
	  ...blockedList.filter(block => block.id !== props.followingId)
	]
      );
    } else {
      await blockAdd(
	{
	  variables:
	  {
	    blockedId: props.followingId
	  }
	}
      );
      setBlocked(true);
      setBlockedList(
	[
	  ...blockedList,
	  {
	    id: props.followingId,
	    userName: props.followingName,
	    handle: props.followingHandle,
	    profilePicture: props.followingProfilePicture

	  }
	]
      );
      
    }
  };
  
  
  const RenderBlocked = () => {
    return(
      <div className="blocked">
	{isBlocked(props.followingId) ?
	  <button id="friendshipButton"
		  onClick={handleBlocked}>
 	    Unblock?
	  </button>
	  :
	  <button id="friendshipButton"
		  onClick={handleBlocked}>
 	    blocking?
	  </button>
	}
      </div>
    );
  };
  

  const RenderButtons = (typeOfFriend) => {
    return(    
      <section className="friendActions">
	{RenderFollowing()}
	<RenderBlocked />
    </section>
    );
    
  };

  
  return(
    <li className="followingEntry" key={props.followingId} data-key={props.followingId}>
      <section className="followingInfo">
	<Link to={`/user/${props.followingId}`}>
	  <img src={`/images/pfp/${props.followingProfilePicture}`} width="150"/>
	  <div className="userId">
	    <span className="username">
	      {props.followingName}({props.followingId})
	    </span>
	    <span className="handle">
	      {props.followingHandle}
	    </span>
	  </div>
	</Link>
      </section>
      {RenderButtons(props.typeOfFollowing)}      
    </li>
    
  );
}

export default FollowingUserEntry;
