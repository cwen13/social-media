import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_USER_FRIENDS } from "./../../utils/queries";
import { ADD_FRIEND } from "./../../utils/mutations";
import ThoughtCreate from "./../ThoughtCreate"
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const UserInfo = ({ page }) => {
  const [ user, setUser] = useState({}); 
  const { userId } = useUserContext();
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
	 ? ""
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

  
  return (
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
  );
};


export default UserInfo;



