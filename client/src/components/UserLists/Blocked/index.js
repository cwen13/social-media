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
  ADD_FOLLOW,
  SEND_FRIEND_REQUEST,
  REMOVE_BLOCKED,
  REMOVE_FOLLOW,
  ADD_BLOCKED
} from "./../../../utils/mutations";

import "./../userListStyles.css";

const Blocked = (props) => {
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

  const [ followRemove, { error: followRemoveError } ] = useMutation(
    REMOVE_FOLLOW,
  );
  
  const [ followAdd, { error: followAddError } ] = useMutation(
    ADD_FOLLOW    
  );

  const [ blockAdd, { error: blockAddError } ] = useMutation(
    ADD_BLOCKED,
  );

  const [ blockRemove, { error: blockRemoveError } ] = useMutation(
    REMOVE_BLOCKED,
  );
  
  const isFriend = (friendId) => friendList.filter((user) => user.id === friendId).length === 1;
  const isFollowing = (followId) => followList.filter((user) => user.id === followId).length === 1;
  const isBlocked = (blockedId) => blockedList.filter((user) => user.id === blockedId).length === 1;
  const isPending = (pendingId) => pendList.filter((user) => user.id === pendingId).length === 1;
  
  const [ friendship, setFriendship ] = useState(isFriend(props.friendId));
  const [ following, setFollowing ] = useState(isFollowing(props.blockedId));
  const [ blocked, setBlocked ] = useState(isBlocked(props.blockedId));
  const [ pending, setPending ] = useState(isPending(props.blockedId));
  
  useEffect(() => {
    setFriendship(isFriend(props.blockedId))
    setFollowing(isFollowing(props.blockedId))
    setBlocked(isBlocked(props.blockedId))
    setPending(isPending(props.blockedId))
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
	    followingId: props.blockedId
	  }
	}
      );
      setFollowing(false);
      setFollowList(
	[
	  ...followList.filter(follow => follow.id !== props.blockedId)
	]
      );
    } else {
      await blockRemove(
	{
	  variables:
	  {
	    blockedId: props.blockedId
	  }
	}
      );
      setBlocked(false);
      setBlockedList(
	[
	    ...blockedList.filter((entry) => entry.id !== props.blockedId)	  
	]
      );
      await followAdd(
	{
	  variables:
	  {
	    followingId: props.blockedId
	  }
	}
      );
      setFollowing(true);
      setFollowList(
	[
	  ...followList,
	  {
	    id: props.blockedId,
	    userName: props.blockedName,
	    handle: props.blockedHandle,
	    profilePicture: props.blockedProfilePicture
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
	    blockedId: props.blockedId
	  }
	}
      );
      setBlocked(false);
      setBlockedList(
	[
	  ...blockedList.filter(block => block.id !== props.blockedId)
	]
      );
    } else {
      await blockAdd(
	{
	  variables:
	  {
	    blockedId: props.blockedId
	  }
	}
      );
      setBlocked(true);
      setBlockedList(
	[
	  ...blockedList,
	  {
	    id: props.blockedId,
	    userName: props.blockedName,
	    handle: props.blockedHandle,
	    profilePicture: props.blockedProfilePicture
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
  const RenderFriendRequestButton = (event) => {
    event.preventDefault();
    const FRhandler = async (userId) => {
      await blockRemove(
	{
	  variables:
	  {
	    blockedId: props.blockedId
	  }
	}
      );
      setBlocked(false);
      setBlockedList(
	[
	    ...blockedList.filter((entry) => entry.id !== props.blockedId)	  
	]
      );
      await friendshipRequest(
	{
	  variables:
	  {
	    pendingId: userId
	  }
	}
      );
      setPending(true);
      setPendList(
	[
	  ...pendList.filter((entry) => entry.id !== props.blockedId)	  
	]
      ); 
    };
    return (
      <div className="friendRequetBtn">
	<button onClick={FRhandler(props.followinngId)} >
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
    <li className="blockedEntry" key={props.blockedId} data-key={props.blockedId}>
      <section className="blockedInfo">
	<Link to={`/user/${props.blockedId}`}>
	  <img src={`/images/pfp/${props.blockedProfilePicture}`} width="150"/>
	  <div className="userId">
	    <span className="username">
	      {props.blockedName}({props.blockedId})
	    </span>
	    <span className="handle">
	      {props.blockedHandle}
	    </span>
	  </div>
	</Link>
      </section>
      {RenderButtons()}
    </li>
 );
};

export default Blocked;
