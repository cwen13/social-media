import React, { useContext, useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { QUERY_USER } from './../../utils/queries';
import ThoughtCreate from "./../ThoughtCreate"
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";



const MyProfile = ({ page }) => {
  const {userId,
	 loginUser, logoutUser,
	 userName, setUserName,
	 profilePicture, setProfilePicture,
	 handle, setHandle,
	 email, setEmail
	} = useUserContext();

  const MyInfo = () => {
    return (
      <section className="userInfo" >
	<h1>=^={userName}=^=</h1>
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
	</div>
	<div className="names">
	  NAME: {handle}
	</div>
	<div className="email">
	  EMAIL: {email}
	</div>
      </section>
    );
  };


  return(
    <>
      <MyInfo />
      <ThoughtCreate userId={userId}
		     page={page}/>
      
    </>
  );
};
  
export default MyProfile;


//      {page !== "EditProfile"
//       ? ""
//       : <section className="editUserProfile">
//	   <form action=""
//		 className="edit-profile-form"
//		   onSubmit={handleEditing}
//	     >
//	       <div className="edit-form">
//		 <label for="userName">UserName</label>
//		 <input type="text"
//			name="userName"
//			id="userName"
//			value={userName}
//		 />
//
//	       </div>
//	       
//	       <div className="edit-form">
//		 <label for="profilePicture">ProfilePicture</label>
//		 <input type="file"
//			name="profilePicture"
//			id="profilePicture"
//		 />
//	       </div>
//	       
//	       <div className="edit-form">
//		 <label for="handle"></label>
//		 <input type="text"
//			name="handle"
//			id="handle"
//			value={handle}
//		 />
//
//	       </div>
//	       
//	       <div className="edit-form">
//		 <label for="email">Email</label>
//		 <input type="email"
//			name="email"
//			id="emial"
//			value={email}
//		 />
//		 
//	       </div>
//	       <div class="edit-form"> 
//		 <input type="submit" />
//	       </div>
//	     </form>
//	   </section>
//
