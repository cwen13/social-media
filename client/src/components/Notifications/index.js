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

const Notifications = () => {

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
notifuttons		[
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
	  console.log("NOTIFS:",notificationsData.getMyNotifications);
    }
  },[notificationsLoading, notificationsError, notificationsData]);

  if(notificationsLoading) return "Loading notifications";
  if(notificationsError) return "Error Loading notifs";

  const RenderUserCard = (user) => {
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
			 ?(<button id="approveFR"
					   onClick={approve}>
				 Approve
			   </button>
			   <button id="disapproveFR"
					   onClick={disapprove}>
				 Disapprove
			   </button>)
			 :(<AcknowledgeButton id={notifId} />)
			}
		  </section>
		</section>
	}
  
  const RenderFriendRequests = () => {
    const notifId = notifFindId()
    
    const approve = async (event) => {
      event.preventDefault();
      const approveRequest = await approveFriend(
		  {
			variables:
			{
			  friendId: .requestingFriend.id
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
			  pendingId: .requestingFriend.id
			}
		  }
      );
    };
    
    return (
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<section className="userNames">
			  <Link to={`/user/${.requestingFriend.id}`}>
				New friend request: <br/>
				<span className="userTag">
				  <img src={`/images/pfp/${.requestingFriend.profilePicture}`}/>
				  {.requestingFriend.userName}
				</span>
			  </Link>
			  <span className="thoughtRef">
				{.requestingFriend.handle}
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
  
  const RenderFollower = () => {
    const notifId = notifFindId()
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<section className="userNames">
			  <p>
				<Link to={`/user/${.follower.id}`}>
				  New follower:<br/>
				  <span className="userTag">
					<img src={`/images/pfp/${.follower.profilePicture}`}/>
					{.follower.userName}
				  </span>
				</Link>
			  </p>
			  <div>
				{.follower.handle}
			  </div>
			</section>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  const RenderLiked = () => {
    const notifId = notifFindId()
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<p>
			  <Link to={`/thought/${.likedThought.id}`}>
				Liked by:<br/>
			  </Link>
			  <span className="userTag">
				<img src={`/images/pfp/${.thoughtLiker.profilePicture}`}/>
				<Link to={`/user/${.thoughtLiker.id}`}>
				  {.thoughtLiker.userName}
				</Link>
			  </span>
			</p>
			<div className="thoughtRef">
			  {.likedThought.content}
			</div>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  const RenderReply = () => {
    const notifId = notifFindId()
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<p>
			  <Link to={`/thought/${.replyThought.id}`}>
				Reply:<br/>
			  </Link>
			  <span className="userTag">
				<img src={`/images/pfp/${.replyThought.thoughtAuthor.profilePicture}`}/>
				<Link to={`/user/${.replyThought.thoughtAuthor.id}`}>
				  {.replyThought.thoughtAuthor.userName}
				</Link>
			  </span>
			</p>
			<div className="reThought">
			  {.replyThought.content}
			</div>
		  </section>
		  <section  className="actions">
			<AcknowledgeButton id={notifId} />
		  </section>
		</li>
    );
  };
  
  const RenderReThought = () => {
    const notifId = notifFindId()
    return(
		<li data-key={notifId} key={notifId}>
		  <section className="notifProfile">
			<p>
			  <Link to={`/thought/${.reThoughtThought.id}`}>
				ReThought:
			  </Link>
			  <span className="userTag">
				<img src={`/images/pfp/${.reThoughtThought.thoughtAuthor.profilePicture}`}/>
				<Link to={`/user/${.reThoughtThought.thoughtAuthor.id}`}>
				  <span>
					{.reThoughtThought.thoughtAuthor.userName}
				  </span>
				</Link>
			  </span>
			</p>
			<div className="reThoughtThought">
			  {.reThoughtThought.content}
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
		{/* new map functoin with new format */}
      </ul>
  );
}

export default Notifications;

// 	{Object.keys(notifications).length !== 0 ? NotifPicker() : "LOADING"}
