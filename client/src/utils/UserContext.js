import React, { useContext, createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./queries";


export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);

  const loginUser = (newUserId) => {
    setUserId(newUserId);
    return newUserId;
  }

  const logoutUser = () => setUserId(1);
  
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
