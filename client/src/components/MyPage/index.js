import React, { useContext, useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { QUERY_USER } from './../../utils/queries';
import ThoughtCreate from "./../ThoughtCreate"
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";


      				<ThoughtCreate userId={userId}
					       pageUserId={userData.getUser.userId}
					       page={page}/> : "" ) :



{page !== "EditProfile"
	 ? ""
	 : <section className="editUserProfile">
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
