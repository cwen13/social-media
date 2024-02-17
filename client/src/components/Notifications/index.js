import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import {
  APPROVE_FRIEND_REQUEST,
  DENY_FRIEND_REQUEST,
  ACKNOWLEDGE_NOTIFICATION
} from "./../../utils/mutations";

import {
  QUERY_USER_FRIENDS,
  GET_MY_NOTIFICATIONS
} from "./../../utils/queries";

import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const Notifications = () => {

  const { userId } = useUserContext();

  const [ notifications, setNotifications ] = useState([]);

  const { loading: notificationsLoading , error: notificationsError, data: notificationsData } = useQuery(
      GET_MY_NOTIFICATIONS
  );
  
  const [ approveFriend, { error: approveError }] = useMutation(
      APPROVE_FRIEND_REQUEST,
      {
		refetchQueries:
		[
			[
				GET_MY_NOTIFICATIONS,
				"getMyNotifications"
			],
			[
				QUERY_USER_FRIENDS,
				"getUserFriends"
			]
		]
      }
  );

  const [ denyFriend, { error: denyError }] = useMutation(
      DENY_FRIEND_REQUEST,
      {
		refetchQueries:
		[
			GET_MY_NOTIFICATIONS,
			"getMyNotifications"
		]
      }
  );

  const [ ackNotif, { error: ackNotifError }] = useMutation(
      ACKNOWLEDGE_NOTIFICATION,
      {
		refetchQueries:
 		[
 			GET_MY_NOTIFICATIONS,
 			"getMyNotifications"
 		]
      }
  );
  
  useEffect(() =>{
    if(!notificationsLoading && !notificationsError && notificationsData !== undefined){
      setNotifications(
		  [
			  ...notifications,
			  ...notificationsData.getMyNotifications
		  ]
      )
    }
  },[notificationsLoading, notificationsError, notificationsData]);

  if(notificationsLoading) return "Loading notifications";
  if(notificationsError) return "Error Loading notifs";

  const approveFR = async (event, requestingUser) => {
    event.preventDefault();
    const approveRequest = await approveFriend(
		{
		  variables:
		  {
			friendId: requestingUser.id
		  }
		}
    );
  };
  
  const disapproveFR = async (event, requestingUser) => {
    event.preventDefault();
    const denyRequest = await denyFriend(
		{
		  variables:
		  {
			pendingId: requestingUser.id
		  }
		}
    );
  };

  const ackPress = async (event, notificationId) => {
	event.preventDefault();
    const acknowledgeEvent = await ackNotif(
		{
		  variables:
		  {
			notificationId: notificationId
		  }
		}
    );
  };
  
  const RenderUserCard = (notificationId, user, friendRequest, type) => {
	console.log("USER:",user);
	return( 
		<section className="userCard">
		  <section className="actions">
			<span>New {type}</span>
			{friendRequest
			 ?(<>
				 <button id="approveFR"
						 onClick={approveFR}>
				   Approve
				 </button>
				 <button id="disapproveFR"
						 onClick={disapproveFR}>
				   Disapprove
				 </button>
			   </>)
			 :(<button onClick={(e) => ackPress(e, notificationId)}>
				 ACK
			   </button>)
			}
		  </section>
		  <section>
			<section className="userNames notifProfile">
			  <Link to={`/user/${user.id}`}>
				<span className="userTag">
				  <img src={`/images/pfp/${user.profilePicture}`}
					   width="150"/>
				  {user.handle}
				</span>
			  </Link>
			</section>
		  </section>
		</section>
	);
  }
  
  const RenderFriendRequest = (entry) => {
	return (
		  <section className="content">
			<Link to={`/users/${entry.requestingFriend.id}`}>
			  <img src={`/images/pfp/${entry.requestingFriend.profilePicture}`} />
			  User: {entry.requestingFriend.userName}
			</Link>
		  </section>
    );
  };
  
  const RenderFollower = (entry) => {
    return(
		  <section className="content">
			<Link to={`/users/${entry.follower.id}`}>
			  <img src={`/images/pfp/${entry.follower.profilePicture}`}
				   width="150"/>
			  {entry.follower.userName}
			</Link>
		  </section>
    );
  };
  
  const RenderLiked = (entry) => {	
    return(
 		  <section className="content">
			<Link to={`/users/${entry.thoughtLiker.id}`}>
			  {entry.likedThought.content}
			</Link>
		  </section>
    );
  };
  
  const RenderReply = (entry) => {
    return(
		  <section className="content">
			<Link to={`/thought/${entry.replyThought.id}/reply`}>
			  {entry.replyThought.content}
			</Link>
		  </section>
    );
  };
  
  const RenderReThought = (entry) => {
    return(
		  <section className="content">
			<Link to={`/thought/${entry.reThoughtThought.id}/ReThought`}>
			  {entry.reThoughtThought.content}
			</Link>
		  </section>
    );
  };
  
  const RenderNotification = (notif) => {
	let user = {};
	let friendRequest = false;
	let type = "";
	let Render = "";

	console.log(notif);
	
	if(notif.pending !== null) {
	  friendRequest = true;
	  user = notif.pending.requestingFriend;
	  type = "Friend Request";
	  Render = RenderFriendRequest(notif.pending);

	} else if(notif.following !== null) {
	  user = notif.following.follower;
	  type = "Follwer";
	  Render = RenderFollower(notif.following);
	  
	} else if(notif.liked !== null) {
	  user = notif.liked.thoughtLiker;
	  type = "Liked";
	  Render = RenderLiked(notif.liked);
	  
	} else if(notif.reply !== null) {
	  console.log("REPLY:",notif.reply.replyThought.thoughtAuthor);
	  user = notif.reply.replyThought.thoughtAuthor;
	  type = "Reply";
	  Render = RenderReply(notif.reply);

	} else if(notif.reThought !== null) {
	  user = notif.reThought.reThoughtThought.thoughtAuthor;
	  type = "ReThought";
	  Render = RenderReThought(notif.reThought);
	} 

	console.log("USER SWITCH:", user);
	return(
		<li data-key={notif.id} key={notif.id}>
		  {RenderUserCard(notif.id, user, friendRequest, type)}
		  {Render}
		</li>
	);
  }

  return(
      <ul className="notifications">
		{notifications.map((notif) => RenderNotification(notif))}
      </ul>
  );
}

export default Notifications;
