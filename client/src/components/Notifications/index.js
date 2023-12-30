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
  GET_MY_NOTIFICATION_IDS
} from "./../../utils/queries";

import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const Notifications = (props) => {

  const [ acknowledged,  setAcknowledged ] = useState(false);
  const [ notifications, setNotifications ] = useState({});

  const { userId } = useUserContext();
  
  const { loading: notificationsLoading , error: notificationsError, data: notificationsData } = useQuery(
    GET_MY_NOTIFICATIONS
  );
  
  const [ approveFriend, { error: approveError }] = useMutation(APPROVE_FRIEND_REQUEST);
  const [ denyFriend, { error: denyError }] = useMutation(DENY_FRIEND_REQUEST);
  const [ ackNotif, { error: ackNotifError }] = useMutation(ACKNOWLEDGE_NOTIFICATION);
  
  useEffect(() =>{
    console.log("USE EFFECT");
   console.log("notifError:", notificationsError);
    if(!notificationsLoading && !notificationsError && notificationsData !== undefined){
      setNotifications(
	{
	  ...notifications,
	  ...(notificationsData.getMyNotifications)
	}
      )
      console.log("NOTIFS:",notificationsData.getMyNotifications);
    }
  },[notificationsLoading, notificationsError, notificationsData]);

  if(notificationsLoading) return "Loading notifications";
  if(notificationsError) return "Error Loading notifs";
  
  const notifFindId = (props) => {
    if(Object.keys(notifications !== 0)) {
      let notifs = notifications.notifications;
      switch(props.__typename) {
      case "Following":
	return (notifs.filter((entry) => (entry.fromUser === props.fromUser
					  && entry.followed === true))).id;
	break;
      case "Pending":
	return (notifs.filter((entry) => (entry.fromUser === props.fromUser
					  && entry.friendRequest === true))).id;
	break;
      case "Liked":
	
	let notifFilter =  (notifs.filter((entry) => {
	console.log("entry:", entry.fromUser );
	console.log("props:", props.thoughtLiker );
	  return (entry.fromUser === props.thoughtLiker.id && entry.likedThoughtId === props.likedThought.id)}));
	console.log("NOTIF FILTER:", notifFilter);
	return notifFilter[0].id
	break;
      case "ReThought":
	return (notifs.filter((entry) => (entry.fromUser === props.fromUser
					  && entry.reThoughtId === props.originalReThgoughtThought))).id;
	break;
      case "Reply":
	return (notifs.filter((entry) => (entry.fromUser === props.fromUser
					  && entry.replyToId === props.originalReplyThought))).id;
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
      const newFriend = await approveFriend(
	{
	  variables:
	  {
	    friendId: props.user.id
	  }
	}
      );
    };
    const disapprove = async (event) => {
      event.preventDefault();
      const denyFriend = await denyFriend(
	{
	  variables:
	  {
	    pendingId: props.user.id
	  }
	}
      );
    };
    
    return (
      <li key={notifId}>
	<h4>FriendRequest </h4>
	<section className=" UserProfile">
	  <img src={`/images/pfp/${props.requestingFriend.profilePicture}`}/>
	  <section className="userNames">
	    <div>
	      <Link to={`/user/${props.requestingFriend.userId}`}>
		{props.requestingFriend.userName}
	      </Link>
	    </div>
	    <div>
	      {props.requestingFriend.handle}
	    </div>
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
  
  const AcknowledgeButton = ({id}) => {
    console.log("ACK BUTTON ID:", id);
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
      <li key={notifId}>
	<h4>Follower</h4>
	<section className=" UserProfile">
	  <img src={`/images/pfp/${props.follower.profilePicture}`}/>
	  <section className="userNames">
	    <div>
	      <Link to={`/user/${props.follower.id}`}>
		{props.follower.userName}
	      </Link>
	    </div>
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
    console.log("LIKED PROPS:", props);
    const notifId = notifFindId(props)
    return(
      <li key={notifId}>
	<h4>Liked</h4>
	<section>
	  <Link to={`/user/${props.thoughtLiker.id}`}>
	    <div>
	      {props.thoughtLiker.userName}
	    </div>
	  </Link>
	  <div>
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
      <li key={notifId}>
	<h4>Reply</h4>
	<section>
	  <Link to={`/user/${props.replyThought.thoughtAuthor.id}`}>
	    <div>
	      {props.replyThought.thoughtAuthor.userName}
	    </div>
	  </Link>
	  <div className="origianlThought">
	    {props.originalReplyThought.content}
	  </div>
	  <div className="replyThought">
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
      <li key={notifId}>
	<h4>ReThought</h4>
	<section>
	  <Link to={`/user/${props.reThoughtThought.thoughtAuthor.id}`}>
	    <div>
	      {props.reThoughtThought.thoughtAuthor.userName}
	    </div>
	  </Link>
	  <div className="origianlThought">
	    {props.originalReThoughtThought.content}
	  </div>
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
