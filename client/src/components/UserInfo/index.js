import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  QUERY_USER,
  QUERY_USER_FRIENDS,
  QUERY_USER_FOLLOWING,
  QUERY_USER_BLOCKED,
  QUERY_MY_PENDING_REQUESTS,
  QUERY_USER_THOUGHTS,
  GET_MY_NOTIFICATIONS,
} from "./../../utils/queries";
import {
  ADD_FOLLOW,
  ADD_BLOCKED,
  REMOVE_BLOCKED,
  REMOVE_FOLLOW,
  REMOVE_FRIEND,
  SEND_FRIEND_REQUEST,
  DENY_FRIEND_REQUEST,  
} from "./../../utils/mutations";
import EditProfile from "./../../pages/EditProfile";
import ThoughtCreate from "./../ThoughtCreate"
import Notifications from "./../Notifications";
import { useUserContext } from "./../../utils/UserContext";
import AuthService from "./../../utils/auth";

import "./style.css";

const UserInfo = ({ page, blocked, setBlocked, userPageId }) => {

  const {
    userId,
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
    pendList,
    setPendList,
  } = useUserContext();

  const [ user, setUser] = useState({}); 
  const [ friendship, setFriendship ] = useState(userId !== userPageId
												 && friendList.filter(friendUser => friendUser.id === userPageId).length !== 0);
  const [ following, setFollowing ] = useState(userId !== userPageId
											   && followList.filter(followUser => followUser.id === userPageId).length !== 0);
  const [ pending, setPending ] = useState(userId !== userPageId
										   && pendList.filter(pendUser => pendUser.pendingId === userPageId).length !== 0);

  
  const {isLodaing: userLoading, error: userError, data: userData} = useQuery(
      QUERY_USER,
      {
		variables:
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
  
  const [ friendRemove, { error: friendRemoveError } ] = useMutation(
      REMOVE_FRIEND,
  );

  const [ pendingRemove, {  error: pendingRemoveError } ] = useMutation(
	  DENY_FRIEND_REQUEST
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
//	  {
//		refetchQueries:
//		[
//			{
//				QUERY_USER_THOUGHTS,
//				"getUserThoughts"
//			},
//			{
//				GET_MY_NOTIFICATIONS,
//				"getMyNotifications"
//			}
//		]
//	  }
//  );

  const [ blockRemove, { error: blockRemoveError } ] = useMutation(
      REMOVE_BLOCKED,
	  {
		refetchQueries:
		[
			QUERY_USER_THOUGHTS,
			"getUserThoughts"
		]
	  }

  );
  
  useEffect(() => {
	if(page === "MyPage" || page === "MainFeed"){
	  setUser(
		  {
			...user,
			id: userId,
			userName: userName,
			handle: handle,
			email: email,
			profilePicture: profilePicture
		  }
	  );
	} else if (!userError && !userLoading && userData !== undefined){
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
  }, [userLoading, userError, userData])
  
  useEffect(() => {
	if(friendship) {
	  setPending(false);
	} else if (pending) {
	  setFriendship(false);
	} else if(pending === false && friendship === false){
	  setPending(false);
	  setFriendship(false);
	} else {
	  setPending(true);
	}
  }, [pending, friendship]);
  
  useEffect(() => {
    if(followList.length !== 0) {
      setFollowing(userId !== userPageId
				   && followList.filter(followUser => followUser.id === userPageId).length !== 0)
    } else {
	  setFollowing(false);
	}
	if(isBlocked(userPageId)) {
	  setFollowing(false);
	}
  }, [following]);


  const isBlocked = (otherUserId) => {
	return (blockedList.filter((blockedEntry) => otherUserId === blockedEntry.id ) > 0);
  };
  
  if(userLoading) return "Loading...";
  if(userError) return `Error User ${userError.message}`;
  if(loadingFriends) return "Loading Friends";
  if(followingLoading) return "Loading Following";
	  
  //-------------------------
  //-------FRIENDSHIP-BUTTON-
  //-------------------------
  const handleFriendship = async (event) => {
    event.preventDefault();
    if(userId===userPageId) return 0;
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
	  setPending(false);
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
    if(Object.keys(pendList).length > 0
       && pendList.filter((entry) =>  entry.pendingId === userPageId).length !== 0) setPending(true);

	const friendOrPending = () => {
	  if(friendship) {
		return( <h4> This is one of your friends </h4>);
	  } else if(pending) {
		return( <h4> This is a possible friend </h4>);
	  } else {
		return(
			<div> This could be the start of a very nice <br />
			  <button id="friendshipButton"
					  onClick={handleFriendship}>
 				Friendship?
			  </button>
			</div>
		);
	  }
	};
	
    return (
		<div className="friendship">
		  {(userId === userPageId)
		   ? "Are you your friend?"
		   : friendOrPending()}
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
    if (isBlocked(userPageId)) {
      await blockRemove(
		  {
			variables:
			{
			  blockedId: userPageId
			}
		  }
      );
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
      setBlockedList(
		  [
			  ...blockedList,
			  {
				id: userPageId,
				userName: userName
			  }
		  ]
      );

		setFriendship(false);
		setPending(false);
		setFollowing(false);
      
    }
  };

  const RenderBlocked = () => {
    return(
		<div className="blocked">
		  {(userId === userPageId)
		   ? "Who are you blocked?"
		   : (isBlocked(userPageId) ?
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

  const UserList = (user) => {
    return(
		<li className={user.listOf}>
		  <Link to={`/user/${user.userId}`}>
			{user.userName}
		  </Link>
		</li>
    );
  };
  
  //------------------------------------
  //---------------STATS----------------
  //------------------------------------
  const RenderStats = () => {
    return(
		<section className="userStats">
		  {userPageId === 0 ? <h2> No user Stats yet </h2>
		   : <ul>
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
			   <li>
				 <Link to={`/userRelations`}>
				   Friends, following, and blocked!
				 </Link>
			   </li>
			   
			 </ul>}
		</section>
    );
  };
  
  return (
      <section className="userInfo" >
		<section className="profile">
		  {userPageId === 0
		   ?<h1>No one is logged in here</h1>
		   :<>
			  <h1>=^={user.userName}=^=</h1>
			  <div className="pfp">
				{profilePicture
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
			  {isBlocked(userPageId) ? "" :
			   <div className="email">
				 EMAIL: {user.email}
			   </div>}
			</>}

		  {userPageId === userId && userPageId !== 0
		   ? <>
			   <ThoughtCreate userId={user.id}
							  page={page} />
			   {page === "MyPage" &&
				<Link to="/user/MyPage/EditProfile">
				  Edit My Profile
				</Link>}	   

			 </>
		   : ""}
		  {userPageId === 0 || isBlocked(userPageId) 
		   ? <h2>There are no friend yet</h2>
		   : <RenderFriendship />}
		  {userPageId === 0 || isBlocked(userPageId)
		   ? <h2>There are no followings yet</h2>
		   : <RenderFollowing />}
		  {userPageId === 0
		   ? <h2>There are no followings yet</h2>
		   : <RenderBlocked />}
		</section>
		{blocked ? "" : <RenderStats />}
		<Notifications />
      </section>
  );
};


export default UserInfo;

