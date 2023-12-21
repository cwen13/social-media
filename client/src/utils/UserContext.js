import React, { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  LOGIN_USER,
  QUERY_USER,
  QUERY_MY_BLOCKED_USERS,
  QUERY_MY_LIKED,
} from "./queries";
import Auth from "./auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {

  const [ userId, setUserId ] = useState(() => {
    if (Auth.getToken()){
      return Auth.isTokenExpired(Auth.getToken()) ? 0 :
	localStorage.getItem("user_id") || 0;
    }
    return 0;
  });

  const [ userName, setUserName ] = useState(null);
  const [ profilePicture , setProfilePicture ] = useState(null);
  const [ handle, setHandle ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ blockedList, setBlockedList ] = useState([]);
  const [ likedList, setLikedList ] = useState([]);
  
  const { loading: loadingBlockedList, error: errorBlockedList, data: dataBlockedList } = useQuery(
    QUERY_MY_BLOCKED_USERS
  );

  const { loading: loadingLiked, error: errorLiked, data: dataLiked } =  useQuery(
    QUERY_MY_LIKED
  );
  
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(
    QUERY_USER,
    {
      variables:
      {
	userId
      }
    }
  );
  
  useEffect(() => {
    if (!loadingBlockedList && !errorBlockedList && dataBlockedList !== null) {
      setBlockedList(
	[
	  ...blockedList,
	  ...dataBlockedList.getMyBlockedUsers.map(user => {return {id: user.id, userName: user.userName}})
	]
      );
    }
    
  }, [loadingBlockedList, errorBlockedList, dataBlockedList]);
  
  useEffect(() => {
    if (!loadingLiked && !errorLiked) {
      setLikedList(
	[
	  ...likedList,
	  ...dataLiked.getAllMyLiked.map(liked => liked.thoughtId)
	]
      );
    }
  }, [loadingLiked, errorLiked, dataLiked]);
  
  useEffect(()=> {
    try {
      if(!loadingUser && !errorUser && dataUser !== undefined && dataUser.getUser !== null) {
	setUserName(dataUser.getUser.userName);
	setProfilePicture(dataUser.getUser.profilePicture);
	setHandle(dataUser.getUser.handle);
	setEmail(dataUser.getUser.email);
      }
    } catch (err) {
      console.error("Did not set dataUser becasue:", err);
    }
  }, [loadingUser, errorUser, dataUser]);

  const loginUser = (newUserId) => {
    setUserId(newUserId);
    return newUserId;
  };

  const logoutUser = () => {
    localStorage.setItem("user_id",0);
    setUserId(0);
  };
  
  return (
    <UserContext.Provider value={{userId,
				  loginUser,
				  logoutUser,
				  userName,
				  setUserName,
				  profilePicture,
				  setProfilePicture,
				  handle,
				  setHandle,
				  email,
				  setEmail,
				  blockedList,
				  setBlockedList,
				  likedList,
				  setLikedList
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
