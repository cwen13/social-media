import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import {
  GET_MY_NOTIFICAITONS,
  
} from "./../../utils/queries";

import { useUserContext } from "./../../utils/UserContext";

const Notifications = (props) => {

  const [ acknowledged,  setAcknowledged ] = useState(false);
  const [ notifications, setNotifications ] = useState({});
  
  const { loading: notificationsLoading , error: notificationsError, data: notificationsData } = useQuery(
    GET_MY_NOTIFICAITONS
  );

  useEffect(() => {
    if(!notificationsLoading && !notificationsError && notificationsData !== undefined) {
      setNotifications(
	{
	  ...notifications,
	  ...notificationsData
	}
      )
    }
    
  }, [ notificationsLoading, notificationsError, notificationsData ])

  if(notificationsLoading) return "Loading notifications";
  
  
  const RenderFriendRequest = () => {
    
  };
  const RenderFollower = () => {

  };
  const RenderLike = () => {

  };
  const RenderReply = () => {

  };
  const RenderReThought = () => {

  };
  const RenderMisc = () => {

  };

  
  return(
    <>
      <ul className="notifications">
	Here is where you hear what happened
      </ul>
    </>
  );
}

export default Notifications;

//	{currentNotifications.map(notif => RenderNotif())}
