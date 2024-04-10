import React, { useState,  useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Feed from "./../../components/Feed/"
import UserInfo from "./../../components/UserInfo";
import Auth from "./../../utils/auth";
import {
  GET_MY_NOTIFICATIONS,
} from "./../../utils/queries";
import { useUserContext } from "./../../utils/UserContext";
import "./../MainStyles/style.css";

const MainFeed = () => {  
  const page = "MainFeed"

  const {
    blockedList,
    setBlockedList,
    friendList,
    setFriendList,
    followList,
    setFollowList,
    pendList,
    setPendList,
  } = useUserContext();
  
  const userId = localStorage.getItem("user_id");

  const userPageId = parseInt(useParams().userId)

  const [ blocked, setBlocked ] = useState(userId !== userPageId
					   && blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0);
  const [ notifications, setNotifications ] = useState([]);
  
  const { loading: notificationsLoading , error: notificationsError, data: notificationsData, refetch: notificationsRefetch } = useQuery(
      GET_MY_NOTIFICATIONS
    );

  const updateNotifs = useCallback(() =>
    {
      notificationsRefetch();
    },[]
  );

  useEffect(() =>
    {
      updateNotifs();
    },[]
  );
  
  useEffect(() => {
    (blockedList.filter(blockedUser => parseInt(blockedUser.id) === userPageId).length !== 0)
      ? setBlocked(true)
      : setBlocked(false);
    if(page !== "UserPage") setBlocked(false);
  }, [blockedList])

  useEffect(() =>{
    if(!notificationsLoading && !notificationsError && notificationsData !== undefined){
      console.log("NOTIF DATA:", notificationsData.getMyNotifications);
      setNotifications(
	[
	  ...notificationsData.getMyNotifications
	]
      )
    }
  },[notificationsLoading, notificationsError, notificationsData]);

  if(notificationsLoading) return "Loading notifications";
  if(notificationsError) return "Error Loading notifs";
  
  return(
    <section id="feedContainer">
      {Auth.loggedIn()
       &&
       <UserInfo page={page}
		 userPageId={localStorage.getItem("user_id")}
		 block={blocked}
		 setBlocked={setBlocked}
       />}
      <Feed id="feed"
	    page={page}
	    userPageId={userPageId}
	    blocked={blocked}
	    setBlocked={setBlocked}
	    updateNotifs={updateNotifs}
      />      
    </section>
  );
};

export default MainFeed;

