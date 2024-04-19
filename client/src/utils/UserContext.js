import React, { useContext, createContext, useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import {
  LOGIN_USER,
  QUERY_ME,
  QUERY_MY_BLOCKED_USERS,
  QUERY_MY_LIKED,
  QUERY_MY_FRIENDS,
  QUERY_MY_FOLLOWING,
  QUERY_MY_PENDING_REQUESTS,
  GET_MY_NOTIFICATIONS
} from "./queries";
import Auth from "./auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {

  const [ userId, setUserId ] = useState(() => {
    if (Auth.getToken()){
      return Auth.isTokenExpired(Auth.getToken()) ? 0 :
	localStorage.getItem("user_id") || 0;
    }
    return 0;
  });

  const [ user, setUser ] = useState(null);
  const [ blockedList, setBlockedList ] = useState([]);
  const [ likedList, setLikedList ] = useState([]);
  const [ friendList, setFriendList ] = useState([]);
  const [ followList, setFollowList ] = useState([]);
  const [ pendList, setPendList ] = useState([]);
  const [ profilePicture, setProfilePicture ] = useState([]);
  const [ notifications, setNotifications ] = useState([]);
  
  const { loading: loadingBlockedList, error: errorBlockedList, data: dataBlockedList } = useQuery(
    QUERY_MY_BLOCKED_USERS
  );

  const { loading: loadingLiked, error: errorLiked, data: dataLiked } =  useQuery(
    QUERY_MY_LIKED
  );
  
  const { loading: loadingFriendList, error: errorFriendList, data: dataFriendList } = useQuery(
    QUERY_MY_FRIENDS
  );
  
  const { loading: loadingFollowList, error: errorFollowList, data: dataFollowList } = useQuery(
    QUERY_MY_FOLLOWING
  );

  const { loading: loadingPendList, error: errorPendList, data: dataPendList } = useQuery(
    QUERY_MY_PENDING_REQUESTS
  );
  
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(
    QUERY_ME,
  );

  const { loading: notificationsLoading , error: notificationsError, data: notificationsData, refetch: notificationsRefetch } = useQuery(
    GET_MY_NOTIFICATIONS
  );  
  
  const updateNotifs = useCallback(() =>
    {
      notificationsRefetch();
    },[]
  );

  useEffect(() =>
    {
      updateNotifs();
    },[]
  );
  
  useEffect(() =>{
    if(Auth.loggedIn() && !notificationsLoading && !notificationsError && notificationsData !== undefined){
      if(notificationsData.getMyNotifications.length === 0)
      {
	setNotifications(null);	
      }
      else
      {
	setNotifications(
	  [
	    ...notificationsData.getMyNotifications
	  ]
	)
      }
    }
  },[notificationsLoading, notificationsError, notificationsData]);
  
  useEffect(() => {

    if (!loadingBlockedList && !errorBlockedList && dataBlockedList !== null) {
      setBlockedList(
	[
	  ...blockedList,
	  ...dataBlockedList.getMyBlockedUsers.map(user => {return {id: user.id, userName: user.userName}})
	]
      );
    }
  }, [loadingBlockedList, errorBlockedList, dataBlockedList,]);
  
  useEffect(() => {
    if (!loadingLiked && !errorLiked) {
      setLikedList(
	[
	  ...likedList,
	  ...dataLiked.getAllMyLiked.map(liked => liked.thoughtId)
	]
      );
    }
  }, [loadingLiked, errorLiked, dataLiked,]);
  
  useEffect(() => {
    if (!loadingFriendList && !errorFriendList && dataFriendList !== null) {
      setFriendList(
	[
	  ...friendList,
	  ...dataFriendList.getMyFriends
	]
      );
    }
  }, [loadingFriendList, errorFriendList, dataFriendList,]);
  
  useEffect(() => {
    if (!loadingFollowList && !errorFollowList && dataFollowList !== null) {
      setFollowList(
	[
	  ...followList,
	  ...dataFollowList.getMyFollowing
	]
      );
    }
  }, [loadingFollowList, errorFollowList, dataFollowList,]);
  
  useEffect(() => {
    if (!loadingPendList && !errorPendList && dataPendList !== null) {
      setPendList(
	[
	  ...pendList,
	  ...dataPendList.getMyPendingRequests
	]
      );
    }
  }, [loadingPendList, errorPendList, dataPendList,]);
  
  useEffect(() => {
    if(!loadingUser && !errorUser && dataUser !== undefined && dataUser.getMe !== null) {
      setUser({
	...dataUser.getMe
      });
    }
  }, [loadingUser, errorUser, dataUser,]);
  
  const loginUser = (newUserId) => {
    setUserId(newUserId);
    return newUserId;
  };

  const logoutUser = () => {
    localStorage.setItem("user_id","");
    setUserId("");
  };

  
  return (
    <UserContext.Provider value={{user,
				  setUser,
				  loginUser,
				  logoutUser,
				  blockedList,
				  setBlockedList,
				  likedList,
				  setLikedList,
				  friendList,
				  setFriendList,
				  followList,
				  setFollowList,
				  pendList,
				  setPendList,
				  notifications,
				  updateNotifs
				 }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if(!context) throw new Error("Did not connect to the context");
  return context;
};
