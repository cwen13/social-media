import React, { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOGIN_USER, QUERY_USER } from "./queries";
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
  
  const { loading, error, data } = useQuery(
    QUERY_USER,
    {
      variables: { userId }
    }
  );
  
  const [ userName, setUserName ] = useState(null);
  const [ profilePicture , setProfilePicture ] = useState(null);
  const [ handle, setHandle ] = useState(null);
  const [ email, setEmail ] = useState(null);
  
  useEffect(()=> {
    const fetchData = () => {
      try {
	if(!loading && !error) {
	  setUserName(data.getUser.userName);
	  setProfilePicture(data.getUser.profilePicture);
	  setHandle(data.getUser.handle);
	  setEmail(data.getUser.email);
	}
      } catch (err) {
	console.error("Did not set data becasue:", err);
      }
    };

    fetchData()

  }, [loading, error, data]);
    
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
				  userName, setUserName,
				  profilePicture, setProfilePicture,
				  handle, setHandle,
				  email, setEmail
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
