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

const Notifications = (notifData) => {

  const { userId } = useUserContext();

  const [ acknowledged,  setAcknowledged ] = useState(false);
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
			  ...notificationsData.getMyNotifications.notifications
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
  
  const RenderUserCard = ({ notificationId, user, friendRequest, type }) => {
	return( 
		<section className="userCard">
		  <section className="actions">
			<span>{type}</span>
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
  
  const RenderFriendRequests = ({ notification, entry, createdAt }) => {    
	return (
		<li data-key={notification.id} key={notification.id}>    
		  {RenderUserCard(
			  {
				notificationId: notification.id,
				user: entry.user,
				friendRequest: true,
				type: "Friend Request"
			  }
		  )}
		  <section className="content">
			<Link to={`/users/${entry.requestingFriend.id}`}>
			  <img src={`/images/pfp/${entry.requestingFriend.profilePicture}`} />
			  User: {entry.requestingFriend.userName}
			</Link>
		  </section>
		</li>
    );
  };
  
  const RenderFollower = ({ notification, entry, createdAt }) => {
    return(
		<li data-key={notification.id} key={notification.id}>  
		  {RenderUserCard(
			  {
				notificationId: notification.id,
				user: entry.user,
				friendRequest: false,
				type: "New Follower"
			  }
		  )}
		  <section className="content">
			<Link to={`/users/${entry.follower.id}`}>
			  <img src={`/images/pfp/${entry.follower.profilePicture}`} />
			  {entry.follower.userName}
			</Link>
		  </section>
		</li>
    );
  };
  
  const RenderLiked = ({ notification, entry, createdAt }) => {	
    return(
		<li data-key={notification.id} key={notification.id}>  
		  {RenderUserCard(
			  {
				notificationId: notification.id,
				user: entry.thoughtLiker,
				friendRequest: false,
				type: "New Like"
			  }
		  )}
 		  <section className="content">
			<Link to={`/users/${entry.thoughtLiker.id}`}>
			  {entry.likedThought.content}
			</Link>
		  </section>
		</li>
    );
  };
  
  const RenderReply = ({ notification, entry, createdAt }) => {
    return(
		<li data-key={notification.id} key={notification.id}>  
		  {RenderUserCard(
			  {
				notificationId: notification.id,
				user: entry.replyThought.thoughtAuthor,
				friendRequest: false,
				type: "New Reply"
			  }
		  )}
		  <section className="content">
			<Link to={`/thought/${entry.replyThought.id}/reply`}>
			  {entry.replyThought.content}
			</Link>
		  </section>
		</li>
    );
  };
  
  const RenderReThought = ({ notification, entry, createdAt }) => {
    return(
		<li data-key={notification.id} key={notification.id}>  
		  {RenderUserCard(
			  {
				notificationId: notification.id,
				user: entry.reThoughtThought.thoughtAuthor,
				friendRequest: false,
				type: "New ReThought"
			  }
		  )}
		  <section className="content">
			<Link to={`/thought/${entry.reThoughtThought.id}/ReThought`}>
			  {entry.reThoughtThought.content}
			</Link>
		  </section>
		</li>
    );
  };
  
  const notificationType = (notif) => {
	if (notif.hasOwnProperty("requestingFriend")) {
	  let user = notif.requestingFriend;
	  let content = {};
	  let createdAt = notif.createdAt;	  
	  return RenderFriendRequests(
		  {
			user,
			content,
			createdAt
		  }
	  );
	  
	} else if(notif.hasOwnProperty("follower")) {
	  let user = notif.follwer;
	  let content = {};
	  let createdAt = notif.createdAt;
	  return RenderFollower(
		  {
			user,
			content,
			createdAt
		  }
	  );
	  
	} else if(notif.hasOwnProperty("likedThought")) {
	  let user = notif.thoughtLiker;
	  let content =
		  {
			id: notif.likedThought.id,
			content: notif.likedThought.content
		  };
	  let createdAt = notif.createdAt;
	  return RenderLiked(
		  {
			user,
			content,
			createdAt
		  }
	  );
	  
	} else if(notif.hasOwnProperty("replyThought")) {
	  let user = notif.replyThgought.thoughtAuthor;
	  let content =
		  {
			id: notif.replyThought.id,
			content: notif.replyThought.content
		  };
	  let createdAt = notif.createdAt;
	  return RenderReply(
		  {
			user,
			content,
			createdAt
		  }
	  );
	  
	} else if(notif.hasOwnProperty("reThoughtThought")) {

	  let user = notif.reThoughtThought.thoughtAuthor;
	  let content =
		  {
			id: notif.reThoughtThought.id,
			content: notif.reThoughtThought.content
		  };
	  let createdAt = notif.createdAt;
	  return RenderReThought(
		  {
			user,
			content,
			createdAt
		  }
	  );
	}
  }

  const RenderNotifications = () => {
	let notificationArray = [];

	for(const notification of notifications) {

	  for(const type in notificationsData.getMyNotifications) {
		let createdAt = parseInt(notification.createdAt);
		let closeEntry = null;
		
		switch(type) {
		  case "notifications":
		  case "__typename":
			continue;
			break;
		  case "friendRequests":
			if(notificationsData.getMyNotifications[type].length === 0) continue;
			closeEntry = notificationsData.getMyNotifications[type]
			  .filter((entry) => (createdAt - parseInt(entry.createdAt)) <= 2000);
			if(closeEntry.length === 0) continue;
			notificationArray
			  .push(RenderFriendRequests(
				  {
					notification,
					entry: closeEntry[0]
				  }
			  ));
			closeEntry  = null;
			break;
			
		  case "followers":
			if(notificationsData.getMyNotifications[type].length === 0) continue;
			closeEntry = notificationsData.getMyNotifications[type]
			  .filter((entry) => (createdAt - parseInt(entry.createdAt)) <= 2000);
			if(closeEntry.length === 0) continue;
			notificationArray
			  .push(RenderFollower(
				  {
					notification,
					entry: closeEntry[0]
				  }
			  ));
			closeEntry  = null;
			break;
			
		  case "likes":
			if(notificationsData.getMyNotifications[type].length === 0) continue;
			closeEntry = notificationsData.getMyNotifications[type]
			  .filter((entry) => (createdAt - parseInt(entry.createdAt)) <= 2000);
			if(closeEntry.length === 0) continue;
			notificationArray
			  .push(RenderLiked(
				  {
					notification,
					entry: closeEntry[0]
				  }
			  ));
			closeEntry  = null;
			break;

		  case "reThoughts":
			if(notificationsData.getMyNotifications[type].length === 0) continue;
			closeEntry = notificationsData.getMyNotifications[type]
			  .filter((entry) => (createdAt - parseInt(entry.createdAt)) <= 2000);
			if(closeEntry.length === 0) continue;
			notificationArray
			  .push(RenderReThought(
				  {
					notification,
					entry: closeEntry[0]
				  }
			  ));
			closeEntry  = null;
			break;

		  case "reply":
			if(notificationsData.getMyNotifications[type].length === 0) continue;
			closeEntry = notificationsData.getMyNotifications[type]
			  .filter((entry) => (createdAt - parseInt(entry.createdAt)) <= 2000);
			if(closeEntry.length === 0) continue;
			notificationArray
			  .push(RenderReply(
				  {
					notification,
					entry: closeEntry[0]
				  }
			  ));
			closeEntry  = null;
			break;
		}
	  }
	}

	let deleteEle = [];
	for(let i = 0; i < notificationArray.length; i++){
	  for(let j = 0; j < notificationArray.length; j++){
		if(i===j || i > j) continue;
		if(deleteEle.find((element) => element === i) !== undefined) continue;
		if (notificationArray[i].key == notificationArray[j].key){
		  deleteEle.push(j);
		}
	  }
	}
	deleteEle.reverse();
	deleteEle.forEach((dup) => notificationArray.splice(dup,1));
	return notificationArray;
  }

  let notifiArray = RenderNotifications();
  return(
      <ul className="notifications">
		{notifiArray.map((item) => item)}
      </ul>
  );
}

export default Notifications;
