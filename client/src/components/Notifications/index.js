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
  QUERY_USER_FRIENDS
} from "./../../utils/queries";

import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const Notifications = (props) => {

  const { userId } = useUserContext();

  const [ acknowledged,  setAcknowledged ] = useState(false);
  const [ notifications, setNotifications ] = useState({});
  
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
		  {
			...notifications,
			...(notificationsData.getMyNotifications)
		  }
      )
    }
  },[notificationsLoading, notificationsError, notificationsData]);

  if(notificationsLoading) return "Loading notifications";
  if(notificationsError) return "Error Loading notifs";

  const createdNearBy = (entryTime, propTime) => {
    let delta = (Math.abs(parseInt(entryTime) - parseInt(propTime)) < 1000);
    return delta;
  }
  
  const notifFindId = (props) => {
    if(Object.keys(notifications !== 0)) {
      let notifs = notifications.notifications;
      switch(props.__typename) {

		case "Following":
		  let notifFollowing =  notifs.filter((entry) => {
			return (entry.fromUser === props.follower.id
					&& entry.followed === true)});
		  if (notifFollowing.length > 0)  return notifFollowing[0].id; 
		  break;

		case "Pending":
		  let notifPending =  notifs.filter((entry) =>
			  (entry.fromUser === props.fromUser
			   && entry.friendRequest === true));
		  if (notifPending.length > 0)  return notifPending[0].id;
		  break;

		case "Liked":
		  let notifLiked = notifs.filter((entry) =>
			  (entry.fromUser === props.thoughtLiker.id
			   && entry.likedThoughtId === props.likedThought.id))
		  if(notifLiked.length > 0) return notifLiked[0].id;
		  break;

		case "ReThought":
		  let notifReThought = notifs.filter((entry) =>
			  (entry.fromUser === props.reThoughtThought.thoughtAuthor.id
			   && entry.reThoughtOfId === props.originalReThoughtThought.id
			   && createdNearBy(entry.createdAt, props.createdAt)));
		  if(notifReThought.length > 0) return notifReThought[0].id;
		  break;

		case "Reply":
		  let notifReply = notifs.filter((entry) =>
			  (entry.fromUser === props.replyThought.thoughtAuthor.id
			   && entry.replyToId === props.originalReplyThought.id
			   && createdNearBy(entry.createdAt, props.createdAt)));
		  if(notifReply.length > 0) return notifReply[0].id;
		  break;

		default:
		  return 0;
      }
    }    
  };
  
  const RenderFriendRequests = (props) => {
    const notifId = notifFindId(props)
    
    const approve = async (event) => {
      event.preventDefault();
      const approveRequest = await approveFriend(
	{
	  variables:
	  {
	    friendId: props.requestingFriend.id
	  }
	}
      );
    };
    
    const disapprove = async (event) => {
      event.preventDefault();
      const denyRequest = await denyFriend(
	{
	  variables:
	  {
	    pendingId: props.requestingFriend.id
	  }
	}
      );
    };
    
    return (
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<section className="userNames">
			  <Link to={`/user/${props.requestingFriend.id}`}>
				New friend request: <br/>
				<span className="userTag">
				  <img src={`/images/pfp/${props.requestingFriend.profilePicture}`}/>
				  {props.requestingFriend.userName}
				</span>
			  </Link>
			  <span className="thoughtRef">
				{props.requestingFriend.handle}
			  </span>
			</section>
		  </section>
		  <section  className="actions">
			<button id="approiveFR"
					onClick={approve}>
			  Approve
			</button>
			<button id="disapproveFR"
					onClick={disapprove}>
			  Disapprove
			</button>	  
		  </section>
		</li>
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
  
  const RenderFollower = (props) => {
    const notifId = notifFindId(props)
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<section className="userNames">
			  <p>
				<Link to={`/user/${props.follower.id}`}>
				  New follower:<br/>
				  <span className="userTag">
					<img src={`/images/pfp/${props.follower.profilePicture}`}/>
					{props.follower.userName}
				  </span>
				</Link>
			  </p>
			  <div>
				{props.follower.handle}
			  </div>
			</section>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  const RenderLiked = (props) => {
    const notifId = notifFindId(props)
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<p>
			  <Link to={`/thought/${props.likedThought.id}`}>
				Liked by:<br/>
			  </Link>
			  <span className="userTag">
				<img src={`/images/pfp/${props.thoughtLiker.profilePicture}`}/>
				<Link to={`/user/${props.thoughtLiker.id}`}>
				  {props.thoughtLiker.userName}
				</Link>
			  </span>
			</p>
			<div className="thoughtRef">
			  {props.likedThought.content}
			</div>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  const RenderReply = (props) => {
    const notifId = notifFindId(props)
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<p>
			  <Link to={`/thought/${props.replyThought.id}`}>
				Reply:<br/>
			  </Link>
			  <span className="userTag">
				<img src={`/images/pfp/${props.replyThought.thoughtAuthor.profilePicture}`}/>
				<Link to={`/user/${props.replyThought.thoughtAuthor.id}`}>
				  {props.replyThought.thoughtAuthor.userName}
				</Link>
			  </span>
			</p>
			<div className="reThought">
			  {props.replyThought.content}
			</div>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  const RenderReThought = (props) => {
    const notifId = notifFindId(props)
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<p>
			  <Link to={`/thought/${props.reThoughtThought.id}`}>
				ReThought:
			  </Link>
			  <span className="userTag">
				<img src={`/images/pfp/${props.reThoughtThought.thoughtAuthor.profilePicture}`}/>
				<Link to={`/user/${props.reThoughtThought.thoughtAuthor.id}`}>
				  <span>
					{props.reThoughtThought.thoughtAuthor.userName}
				  </span>
				</Link>
			  </span>
			</p>
			<div className="reThoughtThought">
			  {props.reThoughtThought.content}
			</div>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  
  return(
      <ul className="notifications">
		{Object.keys(notifications).length !== 0 ? notifications.friendRequests.map((entry) => RenderFriendRequests(entry)) : "LOADING"}
		{Object.keys(notifications).length !== 0 ? notifications.followers.map((entry) => RenderFollower(entry)) : "LOADING"}
		{Object.keys(notifications).length !== 0 ? notifications.likes.map((entry) => RenderLiked(entry)) : "LOADING"}
		{Object.keys(notifications).length !== 0 ? notifications.replys.map((entry) => RenderReply(entry)) : "LOADING"}
		{Object.keys(notifications).length !== 0 ? notifications.reThoughts.map((entry) => RenderReThought(entry)) : "LOADING"}
      </ul>
  );
}

export default Notifications;

// 	{Object.keys(notifications).length !== 0 ? NotifPicker() : "LOADING"}
