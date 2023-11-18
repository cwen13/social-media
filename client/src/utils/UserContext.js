import React, { useContext, createContext, useState } from "react";
import { LOGIN_USER } from "./queries";
import Auth from "./auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {

  const [userId, setUserId] = useState(() => {
    if (Auth.getToken()){
      return Auth.isTokenExpired(Auth.getToken()) ? 0 :
	localStorage.getItem("user_id") || 0;
    }
    return 0;
  });

  const loginUser = (newUserId) => {
    setUserId(newUserId);
    return newUserId;
  };

  const logoutUser = () => {
    localStorage.setItem("user_id",0);
    setUserId(0);
  };
  
  return (
    <UserContext.Provider value={{userId, loginUser, logoutUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if(!context) throw new Error("Did not connect to the context");
  return context;
};
