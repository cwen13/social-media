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
    console.log(event);
    
  }
    
  const renderLanding = () => {
    return (
      <section> LOGIN TO EXP </section>
    );
  };

  const renderUserInfo = () => {
    return (
      <>
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
	  { pageUserId !== 0 ? (page !== "EditProfile" ?
				
      				<ThoughtCreate userId={userId}
					       pageUserId={pageUserId}
					       page={page}/> : "" ) :
	    <p>Sign up or login to start putting your best thougths out there!</p>}
	</section>
	{page !== "EditProfile"
	 ? ""
	 : <section classNAme="editUserProfile">
	     <form action=""
		   className="edit-profile-form"
		   onSubmit={handleEditing}
	     >
	       <div className="edit-form">
		 <label for="userName">UserName</label>
		 <input type="text"
			name="userName"
			id="userName"
			value={userName}
		 />

	       </div>
	       
	       <div className="edit-form">
		 <label for="profilePicture">ProfilePicture</label>
		 <input type="file"
			name="profilePicture"
			id="profilePicture"
		 />
	       </div>
	       
	       <div className="edit-form">
		 <label for="handle"></label>
		 <input type="text"
			name="handle"
			id="handle"
			value={handle}
		 />

	       </div>
	       
	       <div className="edit-form">
		 <label for="email">Email</label>
		 <input type="email"
			name="email"
			id="emial"
			value={email}
		 />
		 
	       </div>
	       <div class="edit-form"> 
		 <input type="submit" />
	       </div>
	     </form>
	   </section>
	}
      </>
    );
  };
  
  return((userId === 0) ? renderLanding() : renderUserInfo());
};

export default UserInfo;



