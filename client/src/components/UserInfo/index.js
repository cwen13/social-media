import React, { useContext, useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { QUERY_USER } from './../../utils/queries';
import ThoughtCreate from "./../ThoughtCreate"
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const UserInfo = ({ page }) => {
  const params = useParams();
  const [ user, setUser] = useState({}); 
  
  const {lodaing: userLoading, error: userError, data: userData} = useQuery(
    QUERY_USER,
    {
      variables :
      {
	userId: params.userId
      }
    }
  );

  useEffect(() => {
    if (!userLoading && !userError && userData !== undefined ) {
      console.log("Setting user");
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

  console.log(user);
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
    </section>
  );
};


export default UserInfo;



