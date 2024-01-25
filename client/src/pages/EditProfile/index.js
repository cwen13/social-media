import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import "./../MainStyles/style.css";
import {
} from "./../../utils/queries";
import {
  UPDATE_USER
} from "./../../utils/mutations";

import { useUserContext } from "./../../utils/UserContext";

const EditProfile = () => {
  
  const {
    profilePicture,
    userName,
    handle,
    email,
    firstName,
    lastName
  } = useUserContext();
  
  const [ userUpdate, setUserUpdate ] = useState(
      {
	profilePicture,
	userName,
	handle,
	email,
	firstName,
	lastName
      }
  );
  
  const [ updateUser, { error: updateError }] = useMutation(
      UPDATE_USER
  );
  
  useEffect(() => {
    if(profilePicture !== null || profilePicture !== undefined) {
      console.log(profilePicture);
      setUserUpdate(
	  {
	    ...userUpdate,
	    profilePicture: profilePicture
	  }
      )
    }
  }, [profilePicture]);
  
  useEffect(() => {
    if(userName !== null) {
      console.log(userName);
      setUserUpdate(
	  {
	    ...userUpdate,
	    userName: userName
	  }
      )
    }
  }, [userName]);
  
  useEffect(() => {
    if(handle !== null || handle !== undefined) {
      console.log(handle);
      setUserUpdate(
	  {
	    ...userUpdate,
	    handle: handle
	  }
      )
    }
  }, [handle]);
  
  useEffect(() => {
    if(email !== null || email !== undefined) {
      setUserUpdate(
	  {
	    ...userUpdate,
	    email: email
	  }
      )
    }
  }, [email]);
  
  useEffect(() => {
    if(lastName !== null || lastName !== undefined) {
      setUserUpdate(
	  {
	    ...userUpdate,
	    lastName: lastName
	  }
      )
    }
  }, [lastName]);
  
  
  useEffect(() => {
    if(firstName !== null || firstName !== undefined) {
      setUserUpdate(
	  {
	    ...userUpdate,
	    firstName: firstName
	  }
      )
    }
  }, [firstName]);
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateUser(
	{
	  variables:
	  {
	    userName: userUpdate.userName,
	    profilePicture: userUpdate.profilePicture,
	    handle: userUpdate.handle,
	    email: userUpdate.email,
            firstName: userUpdate.firstName,
	    lastName: userUpdate.lastName,
	  }
	}
    ); 
  };
  
  const handleChange = (event) => {
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
	
 	<img src={`/images/pfp/${profilePicture}`}
	     width="150"/>
	<div className="attribute">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            value={userUpdate.profilePicture}
            name="profilePicture"
            type="file"
            id="profilePicture"
            onChange={handleChange}
          />
	</div>
	
	<div className="attribute">
          <label htmlFor="userName">User Name:</label>
          <input
            value={`${userUpdate.userName}`}
            name="userName"
            type="text"
            id="userName"
            onChange={handleChange}
          />
        </div>
	
	<div className="attribute">
          <label htmlFor="handle">Handle:</label>
          <input
            value={userUpdate.handle}
            name="handle"
            type="text"
            id="handle"
            onChange={handleChange}
          />
        </div>
	
        <div className="attribute">
          <label htmlFor="firstName">First Name:</label>
          <input
            value={userUpdate.firstName}
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
	
        <div className="attribute">
          <label htmlFor="lastName">Last Name:</label>
          <input
            value={userUpdate.lastName}
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
	
	<div className="attribute">
          <label htmlFor="email">Email:</label>
          <input
            value={userUpdate.email}
            name="email"
            type="text"
            id="email"
            onChange={handleChange}
          />
        </div>
	
        <button type="submit">Submit</button>
      </form>
  );
};


export default EditProfile;

