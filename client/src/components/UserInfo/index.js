import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  QUERY_USER,
  QUERY_USER_FRIENDS,
  QUERY_USER_FOLLOWING,
  QUERY_USER_BLOCKED,
  QUERY_MY_BLOCKED_USERS
} from "./../../utils/queries";
import {
  ADD_FRIEND,
  ADD_FOLLOW,
  ADD_BLOCKED,
  REMOVE_BLOCKED
} from "./../../utils/mutations";
import UserList from "./../UserList";
import ThoughtCreate from "./../ThoughtCreate"
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const UserInfo = ({ page }) => {
  const [ user, setUser] = useState({}); 
  const { userId,
	  loginUser,
	  logoutUser,
	  userName,
	  handle,
	  profilePicture,
	  email,
	  blockedList,
	  setBlockedList
	} = useUserContext();
  let userPageId = useParams().userId;
  userPageId = (userPageId !== undefined) ? userPageId : userId;
  
  const [ friendship, setFriendship ] = useState(false);
  const [ following, setFollowing ] = useState(false);
  const [ blocked, setBlocked ] = useState(false);
  
  
  const {lodaing: userLoading, error: userError, data: userData} = useQuery(
    QUERY_USER,
    {
      variables :
      {
	userId: userPageId
      }
    }
  );

  const { loading:loadingFriends , error: errorFriends, data: dataFriends } = useQuery(
    QUERY_USER_FRIENDS,
    {
      variables:
      {
	userId: userPageId
      }
    }
  )

  const { loading:loadingFollowing , error: errorFollowing, data: dataFollowing } = useQuery(
    QUERY_USER_FOLLOWING,
    {
      variables:
      {
	userId: userPageId
      }
    }
  )

  const { loading:loadingBlocked , error: errorBlocked, data: dataBlocked } = useQuery(
    QUERY_USER_BLOCKED,
    {
      variables:
      {
	userId: userPageId
      }
    }
  )

  const { loading:loadingMyBlocked , error: errorMyBlocked, data: dataMyBlocked } = useQuery(
    QUERY_MY_BLOCKED_USERS
  );
     
  
  const [ friendshipRequest, { error: friendAddError } ] = useMutation(
    ADD_FRIEND,
    {
      refetchQueries:
      [
	QUERY_USER_FRIENDS, "getUserFriends"
      ]
    }
  );

  const [ followAdd, { error: followAddError } ] = useMutation(
    ADD_FOLLOW,
    {
      refetchQueries:
      [
	QUERY_USER_FOLLOWING, "getUserFollowing"
      ]
    }
  );

  const [ blockAdd, { error: blockAddError } ] = useMutation(
    ADD_BLOCKED,
    {
      refetchQueries:
      [
	QUERY_USER_BLOCKED, "getMyBlockedUsers"
      ]
    }
  );

  const [ blockRemove, { error: blockRemoveError } ] = useMutation(
    REMOVE_BLOCKED,
    {
      refetchQueries:
      [
	QUERY_MY_BLOCKED_USERS, "getMyBlockedUsers"
      ]
    }
  );
  
  useEffect(() => {
    if (!userLoading && !userError && userData !== undefined && userPageId !== 0) {
      setUser(
	{
	  ...user,
	  userId: userData.getUser.userId,
	  userName: userData.getUser.userName,
	  handle: userData.getUser.handle,
	  email: userData.getUser.email,
	  profilePicture: userData.getUser.profilePicture
	}
      );
    }
  },[userLoading, userError, userData]);

  if(userLoading) return "Loading...";
  if(userError) return `Error UsEr ${userError.message}`;
  if(loadingFriends) return "Loading Friends";
  if(loadingFollowing) return "Loading Following";
  if(loadingBlocked) return "Loading Blocked";
  if(errorBlocked) return `Error Blocked ${errorBlocked.message}`;

  //-------------------------
  //-------FRIENDSHIP-BUTTON-
  //-------------------------
  const isFriend = () => {
    if (!loadingFriends && dataFriends) {
      let friends = dataFriends.getUserFriends.map(result => result.id);
      return friends.includes(userId);
    }
  };
  
  const handleFriendship = async (event) => {
    event.preventDefault();
    await friendshipRequest(
      {
	variables:
	{
	  friendId: userPageId
	}
      }
    );
    setFollowing(true);
  }
  
  const RenderFriendship = () => {
    return (
      <div className="friendship">
	{(userId === userPageId)
	 ? "Are you your friend?"
	 : (isFriend() ?
	    <h4>
	      This one of your friends
	    </h4>
	    :
	    <div> This could be the start of a very nice <br />
	      <button id="friendshipButton"
		      onClick={handleFriendship}>
 		  Friendship?
	      </button>
	    </div>
	   )
	}
      </ div>
    )
  };

  //-------------------
  //-----FOLLOW-BUTTON-
  //-------------------
  const isFollowed = () => {
    if (!loadingFollowing && dataFollowing) {
      let following = dataFollowing.getUserFollowing.map(result => result.id);
      return following.includes(userId);
    }
  };
  
  const handleFollowing = async (event) => {
    event.preventDefault();
    console.log(userPageId)
    await followAdd(
      {
	variables:
	{
	  followingId: userPageId
	}
      }
    );
    setFollowing(true);
  }

  
  const RenderFollowing = () => {
    return(
      <div className="followingship">
	{(userId === userPageId)
	 ? "Who are you following?"
	 : (isFollowed() ?
	    <h4>
	      This one of your followed
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
  const isBlocked = () => {
    if (!loadingBlocked && dataBlocked) {
      let blocked = dataBlocked.getUserBlocked.map(result => result.id);
      return blocked.includes(userId);
    }
  };
  
  const handleBlocked = async (event) => {
    event.preventDefault();
    if (blockedByMe()) {
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
	  ...blockedList.filter(block => block !== userPageId)
	  
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
	  userPageId
	]
      );
      
    }
  }

  const RenderBlocked = () => {
    return(
      <div className="blocked">
	{(userId === userPageId)
	 ? "Who are you blocked?"
	 : (blockedByMe() ?
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
  const blockedByMe = () => {
    if (!loadingMyBlocked && dataMyBlocked) {
      let myBlocked = dataMyBlocked.getMyBlockedUsers.map(result => result.id);
      return myBlocked.includes(userPageId);
    }
  };
  
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
		 {dataFriends.getUserFriends !== undefined ? dataFriends.getUserFriends.map(friend =>
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
		 {dataBlocked.getUserBlocked !== undefined ? dataBlocked.getUserBlocked.map(block =>
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
	    {blockedByMe() ? "" :
	    <div className="email">
	      EMAIL: {user.email}
	    </div>}
	  </>}
	{userPageId !== userId ? "" :
	<ThoughtCreate userId={userPageId}
		       page={page} />}
	{userPageId === 0 || blockedByMe()
	 ? <h2>There are no friend yet</h2>
	 : <RenderFriendship />}
	{userPageId === 0 || blockedByMe()
	 ? <h2>There are no followings yet</h2>
	 : <RenderFollowing />}
	{userPageId === 0
	 ? <h2>There are no followings yet</h2>
	 : <RenderBlocked />}	
      </section>
      {blockedByMe() ? "" : <RenderStats />}
    </>
  );
};


export default UserInfo;



