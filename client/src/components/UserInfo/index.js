import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { QUERY_USER } from './../../utils/queries';
import ThoughtCreate from "./../ThoughtCreate"
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const UserInfo = ({ page }) => {
  const params = useParams();
//  const { userId, loginUSer, logoutUser } = useUserContext();
  const {userId,
	 loginUser,
	 logoutUser,
	 userName, setUserName,
	 profilePicture, setProfilePicture,
	 handle, setHandle,
	 email, setEmail
	} = useUserContext();

  const setter = (value) => {
    const set = {
      userName: setUserName(value),
      profilePicture: setProfilePicture(value),
      handle: setHandle(value),
      email: setEmail(value)
    }
    return set(value);
  }
  
  const pageUserId = (userId===params.userId) ||
	(page!=="UserPage") ? userId : params.userId;
 
  const [ userNameEdit, setUserNameEdit ] = useState(false);
  const [ profilePictureEdit, setProfilePictureEdit ] = useState(false);
  const [ handleEdit, setHandleEdit ] = useState(false);
  const [ emailEdit, setEmailEdit ] = useState(false);

  const handleEditing = (event) => {
    event.preventDefault();
    console.log(event.target);
    
  }
  
  const editButton = (defaultValue, type, attribute, setAttribute, attributeName) => {
    return(
      <>
	<div id={attributeName}>
	  <input type="text"
		 name={attributeName}
		 value={defaultValue}
	  >
	  </input>
	  <button type="button"
		  className={attributeName}
		  onClick={(event) => console.log(event.target)}>
	    SAVE
	  </button>
	</div>
      </>
    );
  }
  
  const renderLanding = () => {
    return (
      <section> LOGIN TO EXP </section>
    );
  };

  const renderUserInfo = () => {
    return (
      <section className="userInfo" >
	<h1>=^={userName}=^=</h1>
	{page === "EditProfile" ? editButton(userName,
					     "text",
					     userNameEdit,
					     setUserNameEdit) : ""}
	<div className="pfp">
	  {profilePicture
	   ? <img src={`/images/pfp/${profilePicture}`}
		  width="150"/>
	   :
	   <>
 	     +==+<br/>
	     |--|<br/>
	     +==+
	   </>
	  }
	  {page === "EditProfile" ? editButton(profilePicture,
					       "image",
					       profilePictureEdit,
					       setProfilePictureEdit) : ""}
	</div>
	<div className="names">
	  NAME: {handle}
	  {page === "EditProfile" ? editButton(handle,
					       "text",
					       handleEdit,
					       setHandleEdit) : ""}
	</div>
	<div className="email">
	  EMAIL: {email}
	  {page === "EditProfile" ? editButton(email,
					       "email",
					       emailEdit,
					       setEmailEdit) : ""}
	</div>
	{ pageUserId !== 0 ? (page !== "EditProfile" ?
	  
      	  <ThoughtCreate userId={userId}
			 pageUserId={pageUserId}
			 page={page}/> : "" ) :
	  <p>Sign up or login to start putting your best thougths out there!</p>}
      </section>
      {page !== "EditProfile"
       ? ""
       : <section classNAme="editUserProfile">
	   <form >
	     

	   </form>
	 </section>
       
    );
  };
  
  return((userId === 0) ? renderLanding() : renderUserInfo());
};

export default UserInfo;



