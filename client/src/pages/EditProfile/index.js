import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import "./../MainStyles/style.css";

import Auth from "./../../utils/auth";
import {
QUERY_USER
} from "./../../utils/queries";
import {
  UPDATE_USER
} from "./../../utils/mutations";

import { useUserContext } from "./../../utils/UserContext";

const EditProfile = () => {

  const {
    setUserName,
    setProfilePicture,
    setHandle,
    setEmail,
    setFirstName,
    setLastName,    
  } = useUserContext();

  
  let userId = localStorage.getItem("user_id");  
  
  const [ userUpdate, setUserUpdate ] = useState(
      {
	profilePicture: "",
	userName: "",
	handle: "",
	email: "",
	firstName: "",
	lastName: ""
      }
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
  
  const [ updateUser, { error: updateError }] = useMutation(
      UPDATE_USER,
      {
	refetchQueries:
	[
	    {
	      query: QUERY_USER,
	      varibles:
	      {
		userId: userId
	      }
	    }
	]
      }
  );

  useEffect(() => {
    if(!loadingUser && !errorUser && dataUser !== undefined && dataUser.getUser !== null) {
      setUserUpdate(
	  {
	    profilePicture: dataUser.getUser.profilePicture,
	    userName: dataUser.getUser.userName,
	    handle: dataUser.getUser.handle,
	    email: dataUser.getUser.email,
	    firstName: dataUser.getUser.firstName,
	    lastName:dataUser.getUser.lastName,
	  }
      );
    }
  }, [loadingUser, errorUser, dataUser,]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("USER UPDATE:", userUpdate, "USERID:", userId );
    updateUser(
	{
	  variables:
	  {
	    userId: userId,
	    profilePicture: userUpdate.profilePicture,
	    userName: userUpdate.userName,
	    handle: userUpdate.handle,
	    email: userUpdate.email,
            firstName: userUpdate.firstName,
	    lastName: userUpdate.lastName
	  }
	}
    );
    
    setProfilePicture(userUpdate.profilePicture);
    setUserName(userUpdate.userName);
    setHandle(userUpdate.handle);
    setEmail(userUpdate.email);
    setFirstName(userUpdate.firstName);
    setLastName(userUpdate.lastName);
    
    window.location.assign("/user/MyPage");
  };
  
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserUpdate(
	{
	  ...userUpdate,
	  [name]: value,
	}
    );
  };
  
  return(      
      <form onSubmit={handleFormSubmit}
	    id="editProfile">
 	<img src={`/images/pfp/${userUpdate.profilePicture}`}
	     width="150"
	     alt={`profile picture for ${userUpdate.userName}`} />
	<div className="attribute">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            name="profilePicture"
            type="file"
            id="profilePicture"
            onChange={handleChange}
          />
	</div>
	
	<div className="attribute">
          <label htmlFor="userName">User Name:</label>
          <input
            value={userUpdate.userName || "LOADING"}
            name="userName"
            type="text"
            id="userName"
            onChange={handleChange}
          />
        </div>
	
	<div className="attribute">
          <label htmlFor="handle">Handle:</label>
          <input
            value={userUpdate.handle || "LOADING"}
            name="handle"
            type="text"
            id="handle"
            onChange={handleChange}
          />
        </div>
	
        <div className="attribute">
          <label htmlFor="firstName">First Name:</label>
          <input
            value={userUpdate.firstName || "LOADING"}
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
	
        <div className="attribute">
          <label htmlFor="lastName">Last Name:</label>
          <input
            value={userUpdate.lastName || "LOADING"}
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
	
	<div className="attribute">
          <label htmlFor="email">Email:</label>
          <input
            value={userUpdate.email || "LOADING"}
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
	
        <button type="submit">Submit</button>
      </form>
  );
};

export default EditProfile;

