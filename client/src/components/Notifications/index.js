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
  
  const [ approveFriend, { error: approveError }] = useMutation(
    APPROVE_FRIEND_REQUEST,
    {
      refetchQueries:
      [
	GET_MY_NOTIFICATIONS,
	"getMyNotifications"
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
      console.log(notifications);
      let notifs = notifications.notifications;
      switch(props.__typename) {
      case "Following":
	let notifFollowing =  notifs.filter((entry) =>
	  (entry.fromUser === props.fromUser
	   && entry.followed === true));
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
    console.log("PROPS:",props);
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
    console.log(approveError);
    
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
      <li data-key={notifId}>
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
  
  const AcknowledgeButton = ({ id }) => {
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
      <li data-key={notifId}>
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
    const notifId = notifFindId(props)
    return(
      <li data-key={notifId}>
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
      <li data-key={notifId}>
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
      <li data-key={notifId}>
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
