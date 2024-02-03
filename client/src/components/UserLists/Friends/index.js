import React, { useState, useEffect } from "react";
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
} from "./../../../utils/mutations";
import "./../userListStyles.css";

const FriendsList = (props) => {
  const {
    userId,
    followList,
    setFollowList,
    friendList,
    setFriendList,
    blockedList,
    setBlockedList
  } = useUserContext();
  
  const isFriend = (friendId) => friendList.filter((user) => user.id === friendId).length === 1;
  const isFollowing = (followId) => followList.filter((user) => user.id === followId).length === 1;
  const isBlocked = (blockedId) => blockedList.filter((user) => user.id === blockedId).length === 1;
  
  const [ friendship, setFriendship ] = useState(isFriend(props.friendId));
  const [ following, setFollowing ] = useState(isFollowing(props.friendId));
  const [ blocked, setBlocked ] = useState(isBlocked(props.friendId));

  
  const [ approveFriendRequest, { error: approveError }] = useMutation(
    APPROVE_FRIEND_REQUEST,
    {
      refetchQueries:
      [
	[
	  GET_MY_NOTIFICATIONS,
	  "getMyNotifications"
	],
      ]
    }
  );
  
  const [ denyFriendRequest, { error: denyError }] = useMutation(
    DENY_FRIEND_REQUEST,
    {
      refetchQueries:
      [
	GET_MY_NOTIFICATIONS,
	"getMyNotifications"
      ]
    }
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
  
  useEffect(() => {
    setFriendship(isFriend(props.friendId))
    setFollowing(isFollowing(props.friendId))
    setBlocked(isBlocked(props.friendId))     	  
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
	    followingId: props.friendId
	  }
	}
      );
      setFollowing(false);
      setFollowList(
	[
	  ...followList.filter(follow => follow.id !== props.friendId)
	]
      );
    } else {
      await followAdd(
	{
	  variables:
	  {
	    followingId: props.friendId
	  }
	}
      );
      setFollowing(true);
      setFollowList(
	[
	  ...followList,
	  {
	    id: props.friendId,
	    userName: props.friendName,
	    handle: props.friendHandle,
	    profilePicture: props.friendProfilePicture
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
	    blockedId: props.friendId
	  }
	}
      );
      setBlocked(false);
      setBlockedList(
	[
	  ...blockedList.filter(block => block.id !== props.friendId)
	]
      );
    } else {
      await blockAdd(
	{
	  variables:
	  {
	    blockedId: props.friendId
	  }
	}
      );
      setBlocked(true);
      setBlockedList(
	[
	  ...blockedList,
	  {
	    id: props.friendId,
	    userName: props.friendName,
	    handle: props.friendHandle,
	    profilePicture: props.friendProfilePicture

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
  
  
  //------------------------------
  //-------FRIEND-REQUEST-BUTTONS-
  //------------------------------
  
  const approveFriend = async (event) => {
    event.preventDefault();
    const approveRequest = await approveFriendRequest(
      {
	variables:
	{
	  friendId: props.friendId
	}
      }
    );
  };
  
  const disapproveFriend = async (event) => {
    event.preventDefault();
    const denyRequest = await denyFriendRequest(
      {
	variables:
	{
	  pendingId: props.friendId
	}
      }
    );
  };
  
  const RenderFriendRequestButtons = () => {
    return (
      <div  className="actions">
	<button id="approveFR"
		onClick={approveFriend}>
	  Approve
	</button>
	<button id="disapproveFR"
		onClick={disapproveFriend}>
	  Disapprove
	</button>
      </div>
    );
  };
  
  const RenderButtons = () => {
    return(
      <section className="friendActions">
	{props.typeOfRelation === "Request" && <RenderFriendRequestButtons />}
	<RenderFollowing />
	<RenderBlocked />
      </section>
    );
  }
  
  return(
    <li className="friendEntry" key={props.friendId} data-key={props.friendId}>
      <section className="friendInfo">
	<Link to={`/user/${props.friendId}`}
	      className="friendInfo">
	  <img src={`/images/pfp/${props.friendProfilePicture}`} width="150"/>
	  <div className="userId">
	    <span className="username">
	      {props.friendName}({props.friendId})
	    </span>
	    <span className="handle">
	      {props.friendHandle}
	    </span>
	  </div>
	</Link>
      </section>
      {RenderButtons()}
    </li> 
  );
};

export default FriendsList;
