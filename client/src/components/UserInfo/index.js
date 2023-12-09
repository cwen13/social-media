import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  QUERY_USER,
  QUERY_USER_FRIENDS
} from "./../../utils/queries";
import { ADD_FRIEND } from "./../../utils/mutations";
import Following from "./../Following";
import FriendList from "./../FriendList";
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
    
  const [ friendshipRequest, { error: friendAddError } ] = useMutation(
    ADD_FRIEND,
    {
      refetchQueries:
      [
	QUERY_USER_FRIENDS, "addFriend"
      ]
    }
  );

  useEffect(() => {
    if (!userLoading && !userError && userData !== undefined ) {
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
    setFriendship(true);
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
    
  const renderFollowing = () => {
    
  };

  const RenderStats = () => {
    return(
      <ul className="userStats">
	<li>Number of friends 
	  {/*This will be a mini scroll box likely a iframe*/}
	  <ul id="friendsList">
	    {dataFriends ? dataFriends.getUserFriends.map(friend =>
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
	  <Link to={`/user/${userPageId}/following`}>
	    See everyone you follow
	  </Link>
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
      </ul>
    );
  }

  
  return (
    <>
      <section className="userInfo" >
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
	<RenderFriendship />
      </section>
      <RenderStats />
    </>
  );
};


export default UserInfo;



