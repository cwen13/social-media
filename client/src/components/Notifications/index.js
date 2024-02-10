import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import {
  APPROVE_FRIEND_REQUEST,
  DENY_FRIEND_REQUEST,
  ACKNOWLEDGE_NOTIFICATION
} from "./../../utils/mutations";

import {
  GET_MY_NOTIFICATIONS,
  QUERY_USER_FRIENDS,
  GET_NOTIFICATION_ID
} from "./../../utils/queries";

import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const Notifications = () => {

  const { userId } = useUserContext();

  const [ acknowledged,  setAcknowledged ] = useState(false);
  const [ notifications, setNotifications ] = useState({});
  
  const { loading: notificationsLoading , error: notificationsError, data: notificationsData } = useQuery(
      GET_MY_NOTIFICATIONS
  );

  const { loading: notificationIdLoading , error: notificationIdError, data: notificationsIdData } = useQuery(
	  GET_NOTIFICATION_ID
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

	  let sortedNotif  = (a,b) => a.createdAt - b.createdAt
	  let notifTypes = Object.keys(notificationsData)
	  let notifList = notifTypes
		  .map(key => [...notificationsData[key]])
		  .flat()
		  .sort(sortedNotif);
	  
      setNotifications(
		  {
			...notifications,
			...notifList
		  }
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
    
  const disapproveFR = async (event,  requestingUser) => {
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

  const AcknowledgeButton = ({ id }) => {
    const ackPress = async (event) => {
      event.preventDefault();
      const acknowledgeEvent = await ackNotif(
		  {
			variables:
			{
			  notificationId: parseInt(id)
			}
		  }
      );
    };
    return(
		<button onClick={ackPress}>
		  ACK
		</button>
    );
  };
  
  const RenderUserCard = ({ user, friendRequest }) => {
	return(
		<section className="userCar">
		  <section className="userNames">
			<Link to={`/user/${user.id}`}>
			  <span className="userTag">
				<img src={`/images/pfp/${user.profilePicture}`}/>
				{user.userName}
			  </span>
			</Link>
			<span className="thoughtRef">
			  {user.handle}
			</span>
		  </section>
		  <section  className="actions">
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
			 :(<AcknowledgeButton  />)
			}
		  </section>
		</section>
	);
  }
  
  const RenderFriendRequests = ({ user, content ,createdAt }) => {    
	return (
		<li data-key={1} key={1}>
		  {RenderUserCard(
			  {
				user: user,
				friendRequest: true,
				createdAt: createdAt
			  }
		  )
		  }
		</li>
    );
  };
  
  
  const RenderFollower = ({ user, friendRequest, createdAt}) => {
    return(
		<li data-key={1} key={1}>
		  {RenderUserCard(
			  {
				user: user,
				friendRequest: true,
				createdAt: createdAt
			  }
		  )
		  }
		</li>
    );
  };
  
  const RenderLiked = ({ user, friendRequest, createdAt}) => {
    
    return(
		<li data-key={1} key={1}>
		  {RenderUserCard(
			  {
				user: user,
				friendRequest: true,
				createdAt: createdAt
			  }
		  )
		  }
		</li>
    );
  };
  
  const RenderReply = ({ user, friendRequest, createdAt}) => {
    return(
		<li data-key={1} key={1}>
		  {RenderUserCard(
			  {
				user: user,
				friendRequest: true,
				createdAt: createdAt
			  }
		  )
		  }
		</li>
    );
  };
  
  const RenderReThought = ({ user, friendRequest, createdAt}) => {
    return(
		<li data-key={1} key={1}>
		  {RenderUserCard(
			  {
				user: user,
				friendRequest: true,
				createdAt: createdAt
			  }
		  )
		  }
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

  
  return(
      <ul className="notifications">
		{/* new map functoin with new format */}
      </ul>
  );
}

export default Notifications;

// 	{Object.keys(notifications).length !== 0 ? NotifPicker() : "LOADING"}
