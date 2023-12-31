import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  QUERY_USER,
  QUERY_USER_FRIENDS,
  QUERY_USER_FOLLOWING,
  QUERY_USER_BLOCKED,
  QUERY_MY_PENDING_REQUESTS
} from "./../../utils/queries";
import {
  ADD_FOLLOW,
  ADD_BLOCKED,
  REMOVE_BLOCKED,
  REMOVE_FOLLOW,
  REMOVE_FRIEND,
  SEND_FRIEND_REQUEST,
  DENY_FRIEND_REQUEST,
  APPROVE_FRIEND_REQUEST,
} from "./../../utils/mutations";
import UserList from "./../UserList";
import ThoughtCreate from "./../ThoughtCreate"
import Notifications from "./../Notifications";
import { useUserContext } from "./../../utils/UserContext";
import AuthService from "./../../utils/auth";

import "./style.css";

const UserInfo = ({ page, blocked, setBlocked }) => {
  const [ user, setUser] = useState({}); 
  const [ pending, setPending ] = useState(false);
  
  const { userId,
	  loginUser,
	  logoutUser,
	  userName,
	  handle,
	  profilePicture,
	  email,
	  blockedList,
	  setBlockedList,
	  friendList,
	  setFriendList,
	  followList,
	  setFollowList,
	} = useUserContext();

  let userPageId = useParams().userId;
  userPageId = (userPageId !== undefined) ? userPageId : userId;

  const [ friendship, setFriendship ] = useState(userId !== userPageId && friendList.filter(friendUser => friendUser.id === userPageId).length !== 0);
  const [ following, setFollowing ] = useState(userId !== userPageId && followList.filter(followUser => followUser.id === userPageId).length !== 0);

  const { loading: pendingLoading, error: pendingError, data: pendingData } = useQuery(
    QUERY_MY_PENDING_REQUESTS
  );
  
  const {lodaing: userLoading, error: userError, data: userData} = useQuery(
    QUERY_USER,
    {
      variables :
      {
	userId: userPageId
      }
    }
  );

  const { loading:loadingFriends , error: friendsError, data: friendsData } = useQuery(
    QUERY_USER_FRIENDS,
    {
     variables:
      {
	userId: userPageId
      }
    }
  );

  const { loading:followingLoading , error: errorFollowing, data: dataFollowing } = useQuery(
    QUERY_USER_FOLLOWING,
    {
      variables:
      {
	userId: userPageId
      }
    }
  );
  
  const [ friendshipRequest, { error: friendAddError } ] = useMutation(
    SEND_FRIEND_REQUEST,
  );
  
  const [ approveFriendshipRequest, { error: appriveFriendRequestError } ] = useMutation(
    APPROVE_FRIEND_REQUEST,
  );
  
  const [ denyFriendshipRequest, { error: denyFriendRequestError } ] = useMutation(
    DENY_FRIEND_REQUEST,
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
    if (!userLoading && !userError && userData !== undefined && userPageId !== 0) {
      setUser(
	{
	  ...user,
	  id: userData.getUser.id,
	  userName: userData.getUser.userName,
	  handle: userData.getUser.handle,
	  email: userData.getUser.email,
	  profilePicture: userData.getUser.profilePicture
	}
      );
    }
    if(friendList !== 0) {
      setFriendship(userId !== userPageId && friendList.filter(friendUser => friendUser.id === userPageId).length !== 0)
    }
    if(followList !== 0) {
      setFollowing(userId !== userPageId && followList.filter(followUser => followUser.id === userPageId).length !== 0)
    }
    
  },[userLoading, userError, userData, friendList, followList]);

  
  if(userLoading) return "Loading...";
  if(userError) return `Error UsEr ${userError.message}`;
  if(loadingFriends) return "Loading Friends";
  if(followingLoading) return "Loading Following";
  if(pendingLoading) return "Loading Pending";
  
  //-------------------------
  //-------FRIENDSHIP-BUTTON-
  //-------------------------
  const handleFriendship = async (event) => {
    event.preventDefault();
    if(friendship) {
      await friendRemove(
	{
	  variables:
	  {
	    friendingId: userPageId
	  }
	}
      );
      setFriendship(false);
      setFriendList(
	[
	  ...friendList.filter(friend => friend.id !== userPageId)
	]
      );

    } else {
      await friendshipRequest(
	{
	  variables:
	  {
	    pendingId: userPageId
	  }
	}
      );
      setPending(true);
    };
  };
  
  const RenderFriendship = () => {
    if(Object.keys(pendingData).length > 0
       && pendingData.getMyPendingRequests
       .filter((entry) =>  entry.pendingId == userPageId).length > 0) setPending(true);
    
    return (
      <div className="friendship">
	{(userId === userPageId)
	 ? "Are you your friend?"
	 : (friendship ?
	    <h4>
	      This one of your friends
	    </h4>
	    : (pending ? <h4>
			   Waiting on thier approval
			 </h4>
	       :
	    <div> This could be the start of a very nice <br />
	      <button id="friendshipButton"
		      onClick={handleFriendship}>
 		  Friendship?
	      </button>
	    </div>
	      )
	   )
	}
      </ div>
    );
  };

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
	    followingId: userPageId
	  }
	}
      );
      setFollowing(false);
      setFollowList(
	[
	  ...followList.filter(follow => follow.id !== userPageId)
	]
      );
    } else {
      await followAdd(
	{
	  variables:
	  {
	    followingId: userPageId
	  }
	}
      );
      setFollowing(true);
      setFollowList(
	[
	  ...followList,
	  {
	    id: userPageId,
	    userName: userName
	  }
	]
      );
    };
  };
  
  const RenderFollowing = () => {
    return(
      <div className="followingship">
	{(userId === userPageId)
	 ? "Who are you following?"
	 : (following ?
	    <h4>
	      This one of your followed accounts
	    </h4>
	    :
	    <div> This could be the start of a very nice <br />
	      <button id="friendshipButton"
		      onClick={handleFollowing}>
 		  followship?
	      </button>
	    </div>
	   )
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
	    blockedId: userPageId
	  }
	}
      );
      setBlocked(false);
      setBlockedList(
	[
	  ...blockedList.filter(block => block.id !== userPageId)
	]
      );
    } else {
      await blockAdd(
	{
	  variables:
	  {
	    blockedId: userPageId
	  }
	}
      );
      setBlocked(true);
      setBlockedList(
	[
	  ...blockedList,
	  {
	    id: userPageId,
	    userName: userName
	  }
	]
      );
      
    }
  };

  const RenderBlocked = () => {
    return(
      <div className="blocked">
	{(userId === userPageId)
	 ? "Who are you blocked?"
	 : (blocked ?
	    <>
	    <h4>
	      This one of your blocked users
	    </h4>
	    <button id="friendshipButton"
		    onClick={handleBlocked}>
 	      Unblock?
	    </button>
	    </>
	    :
	    <div> This could be the start of a very nice <br />
	      <button id="friendshipButton"
		      onClick={handleBlocked}>
 		blocking?
	      </button>
	    </div>
	   )
	}
      </div>
    );
  };


  //------------------------------------
  //----check-if-User-have-them-blocked-
  //------------------------------------
  const RenderStats = () => {
    return(
      <>
	{userPageId === 0 ? <h2> No user Stats yet </h2>
	 : <ul className="userStats">
	     <li>
	       <Link to={`/user/${userPageId}/liked`}>
		 Liked thoughts
	       </Link>
	     </li>
	     <li>
	       <Link to={`/user/${userPageId}/reThoughts`}>
		 Link to reThoughts
	       </Link>
	     </li>
	     
	     <li>Friends 
	       {/*This will be a mini scroll box likely a iframe*/}
	       <ul id="friendsList">
		 {friendsData.getUserFriends !== undefined ? friendsData.getUserFriends.map(friend =>
		   <UserList userId={friend.id}
			     key={friend.id}
			     userName={friend.userName}
			     page={page}
			     listOf="friendList"
		   />)
		     : "There are no friends yet"}
	       </ul>
	     </li>
	     
	     <li>
	       {/*This will be a mini scroll box likely a iframe*/}
	       Following
	       <ul id="followingList">
		 {dataFollowing.getUserFollowing !== undefined ? dataFollowing.getUserFollowing.map(follow =>
		   <UserList userId={follow.id}
			     key={follow.id}
			     userName={follow.userName}
			     page={page}
			     listOf="followingList"
		   />)
		     : "There are no follows yet"}
	       </ul>
	     </li>
	     <li>
	       <Link to={`/user/${userPageId}/blocked`}>
		 Blocked
	       </Link>
	       <ul id="blockedList">
		 {blockedList.length > 0
		  ? blockedList.map(block =>
		    <UserList userId={block.id}
			      key={block.id}
			      userName={block.userName}
			      page={page}
			      listOf="blockedList"
		    />)
		  : "There are no blocks yet"}
	       </ul>
	     </li>	
	   </ul>}
      </>
    );
  };
  
  return (
    <>
      <section className="userInfo" >
	{userPageId === 0
	 ?<h1>No one is logged in here</h1>
	 :<>
	    <h1>=^={user.userName}=^=</h1>
	    <div className="pfp">
	      {user.profilePicture
	       ? <img src={`/images/pfp/${user.profilePicture}`}
		      width="150"/>
	       :
	       <>
 		 +==+<br/>
		 |-----|<br/>
		 +==+
	       </>
	      }
	    </div>
	    <div className="names">
	      NAME: {user.handle}
	    </div>
	    {blocked ? "" :
	    <div className="email">
	      EMAIL: {user.email}
	    </div>}
	  </>}
	{userPageId === userId && userPageId !== 0
	 ? <>
	     <ThoughtCreate userId={userPageId}
			    page={page} />
	     <Notifications />
	 </>
	 : ""}
	{userPageId === 0 || blocked 
	 ? <h2>There are no friend yet</h2>
	 : <RenderFriendship />}
	{userPageId === 0 || blocked
	 ? <h2>There are no followings yet</h2>
	 : <RenderFollowing />}
	{userPageId === 0
	 ? <h2>There are no followings yet</h2>
	 : <RenderBlocked />}
	{blocked ? "" : <RenderStats />}
      </section>
    </>
  );
};


export default UserInfo;



