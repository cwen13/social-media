import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  QUERY_USER,
  QUERY_USER_FRIENDS,
  QUERY_USER_FOLLOWING
} from "./../../utils/queries";
import {
  ADD_FRIEND,
  ADD_FOLLOW
} from "./../../utils/mutations";
import Following from "./../Following";
import UserList from "./../FriendList";
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
	  email
	} = useUserContext();
  let userPageId = useParams().userId;
  userPageId = (userPageId !== undefined) ? userPageId : userId;

  const [ friendship, setFriendship ] = useState(false);
  const [ following, setFollowing ] = useState(false);
  
  
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
  if(userError) return `Error ${userError.message}`;
  
  const isFriend = () => {
    if (!loadingFriends && dataFriends) {
      let friends = dataFriends.getUserFriends.map(result => result.id);
      return friends.includes(userId);
    }
  };
  
  const handleFriendship = async (event) => {
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

  const isFollowed = () => {
    if (!loadingFollowing && dataFollowing) {
      let following = dataFollowing.getUserFollowing.map(result => result.id);
      return following.includes(userId);
    }
  };
  
  const handleFollowing = async (event) => {
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

  const RenderStats = () => {
    return(
      <>
	{userPageId === 0 ? <h2> No user Stats yet </h2>
	 : <ul className="userStats">
	     <li>Number of friends 
	       {/*This will be a mini scroll box likely a iframe*/}
	       <ul id="friendsList">
		 {dataFriends ? dataFriends.getUserFriends.map(friend =>
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
	       <Link to={`/user/${userPageId}/following`}>
		 Following
	       </Link>
	       <ul id="followsList">
		 {dataFollowing ? dataFollowing.getUserFollowing.map(follow =>
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
	       <Link to={`/user/${userPageId}/blocked`}>
		 Blocked
	       </Link>
	     </li>	
	   </ul>}
	</>
    );
	}
  
  
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
		 |--|<br/>
		 +==+
	       </>
	      }
	    </div>
	    <div className="names">
	      NAME: {user.handle}
	    </div>
	    <div className="email">
	      EMAIL: {user.email}
	    </div>
	  </>}
	{userPageId === 0
	 ? <h2>There are no friend yet</h2>
	 : <RenderFriendship />}
	{userPageId === 0
	 ? <h2>There are no followings yet</h2>
	 : <RenderFollowing />}
	
      </section>
      <RenderStats />      
    </>
  );
};


export default UserInfo;



