import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import { useUserContext } from "./../../utils/UserContext";

const Notifications = (props.) => {

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
  
  const RenderNotif = () => {
    // going to switch between possible notifications
    // reply, friend request, rethought, like, and follower
    switch (typeOfEvent) {
    case "Friend Request":
      return <RenderFriendRequest />;
      break;
    case "Follower":
      return <RenderFollow />;
      break;      
    case "Like":
      return <RenderLike />;
      break;
    case "Reply":
      return <RenderReply />;
      break;
    case "ReThought":
      return <RenderReThought />;
      break;
    default:
      return <RenderMisc />
    };
  };

  return(
    <>
      <ul className="notifications">
	{currentNotifications.map(notif => RenderNotif())}
      </ul>
    </>
  );
}

export default Notifications;
