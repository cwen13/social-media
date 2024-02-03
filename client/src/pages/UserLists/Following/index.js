import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useUserContext } from "./../../../utils/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_MY_FRIENDS,
  QUERY_MY_PENDING_REQUESTS,
  GET_MY_NOTIFICATIONS,
} from "./../../../utils/queries";

import {
  REMOVE_FRIEND,
  REMOVE_FOLLOW,
  ADD_FOLLOW,
  SEND_FRIEND,
  DENY_FRIEND_REQUEST,
  APPROVE_FRIEND_REQUEST,
  ADD_BLOCKED,
  REMOVE_BLOCKED,
  SEND_FRIEND_REQUEST
} from "./../../../utils/mutations";
import "./../userListStyles.css";

const Following = (props) => {
  const { userId,
	  followList,
	  setFollowList,
	  friendList,
	  setFriendList,
	  blockedList,
	  setBlockedList,
	  pendList,
	  setPendList
	} = useUserContext();

  const [ friendshipRequest, { error: friendAddError } ] = useMutation(
    SEND_FRIEND_REQUEST,
  );

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
  
  const isFriend = (friendId) => friendList.filter((user) => user.id === friendId).length === 1;
  const isFollowing = (followId) => followList.filter((user) => user.id === followId).length === 1;
  const isBlocked = (blockedId) => blockedList.filter((user) => user.id === blockedId).length === 1;
  const isPending = (pendingId) => pendList.filter((user) => user.id === pendingId).length === 1;
  
  const [ friendship, setFriendship ] = useState(isFriend(props.followingId));
  const [ following, setFollowing ] = useState(isFollowing(props.followingId));
  const [ blocked, setBlocked ] = useState(isBlocked(props.followingId));
  const [ pending, setPending ] = useState(isPending(props.followingId));
  
  useEffect(() => {
    setFriendship(isFriend(props.followingId))
    setFollowing(isFollowing(props.followingId))
    setBlocked(isBlocked(props.followingId))
    setPending(isPending(props.followingId))
    
  }, [])
  
  //-------------------
  //-----FOLLOW-BUTTON-
  //------------------- 
  const handleFollowing = async (event) => {
    event.preventDefault();
    if(following) {
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
	{following
	 ?
	 <button id="followButton"
		 onClick={handleFollowing}>
	   UnFollow
	 </button>
	 :
	 <button id="followButton"
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
    if (blocked) {
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
	{blocked
	 ?
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
  
  
  //-------------------------
  //---FRIEND-REQUEST-BUTTON-
  //-------------------------
  
  const FRhandler = async (event) => {
    event.preventDefault();
    await friendshipRequest(
	{
	  variables:
	  {
	    pendingId: props.followingId
	  }
	}
    );
  };
  
  const RenderFriendRequestButton = (event) => {
    
    return (
      <div className="friendRequetBtn">
	<button onClick={FRhandler} >
	  Request<br/> Friendship?
	  </button>
      </div>
    );
  };
  
  const RenderButtons = () => {
    return(
      <section className="friendActions">
	{(!friendship && !pending) && <RenderFriendRequestButton />}
	<RenderFollowing />
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
};

export default Following
      
