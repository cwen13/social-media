import React, { useContext, createContext, useState } from "react";
import { LOGIN_USER } from "./queries";


export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);

  const loginUser = (newUserId) => {
    setUserId(newUserId);
    return newUserId;
  }

  const logoutUser = () => setUserId(0);
  
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
