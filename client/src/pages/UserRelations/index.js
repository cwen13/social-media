import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_MY_PENDING_REQUESTS,
  QUERY_MY_BLOCKED_USERS,
  QUERY_MY_FOLLOWING,
  QUERY_MY_FRIENDS
} from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import FriendList from "./../UserLists/Friends";
import FollowingList from "./../UserLists/Following";
import BlockedList from "./../UserLists/Blocked";
import { useUserContext } from "./../../utils/UserContext";

import "./../MainStyles/style.css";

const UserRelations = () => {
  const page = "UserRelataions";
  
  const {
    friendList,
    setFriendList,
    pendList,
    setPendList,
    followList,
    setFollowList,
    blockedList,
    setBlockedList,
  } = useUserContext();

  const { loading: pendingLoading, error: pendingError, data: pendingData } = useQuery(
    QUERY_MY_PENDING_REQUESTS,
  );
  const { loading: blockedLoading, error: blockedError, data: blockedData } = useQuery(
    QUERY_MY_BLOCKED_USERS,
  );
  const { loading: followingLoading, error: followingError, data: followingData } = useQuery(
    QUERY_MY_FOLLOWING,
  );
  const { loading: friendsLoading, error: friendsError, data: friendsData } = useQuery(
    QUERY_MY_FRIENDS,
  );

  if(pendingLoading) return "Loading"
  if(followingLoading) return "Loading"
  if(friendsLoading) return "Loading"
  if(blockedLoading) return "Loading"
  
  return(
    <section id="feedContainer">
      <UserInfo page={page} />
      
      <section id="UserLists">
	<section id="friends">
	<h3>PENDING FRIEND REQUESTS</h3>
	<ul id="pendingFriends">
	  {pendingData?.getMyPendingRequests.map((friend) =>
	    <FriendList friendId={friend.requestingFriend.id}
			     friendName={friend.requestingFriend.userName}
			     friendHandle={friend.requestingFriend.handle}
			     friendProfilePicture={friend.requestingFriend.profilePicture}
			     typeOfRelation="Request"
	    />)}
	</ul>
	<h3>FRIENDS</h3>
	<ul id="currentFriends">
	  {friendsData?.getMyFriends.map((friend) =>
	    <FriendList friendId={friend.id}
			     friendName={friend.userName}
			     friendHandle={friend.handle}
			     friendProfilePicture={friend.profilePicture}
			     typeOfRelation="Friend"
	    />)}
	</ul>
	</section>

	<section id="following">
	  <h3>FOLLOWING</h3>
	  <ul id="pendingFriends">
	    {followingData?.getMyFollowing.map((following) =>
	      <FollowingList followingId={following.id}
			     followingName={following.userName}
			     followingHandle={following.handle}
			     followingProfilePicture={following.profilePicture}
			     typeOfRelation="Following"
	      />)}
	  </ul>
	</section>
	
	<section id="blocked">
	  <h3>BLOCKED USERS</h3>
	  <ul id="pendingFriends">
	    {blockedData?.getMyBlockedUsers.map((blocked) =>
	      <BlockedList blockedId={blocked.requestingBlocked.id}
			   blockedName={blocked.requestingBlocked.userName}
			   blockedHandle={blocked.requestingBlocked.handle}
			   blockedProfilePicture={blocked.requestingBlocked.profilePicture}
			   typeOfRelation="Blocked"
	      />)}
	  </ul>
	</section>	
      </section>
    </section>
  );
}

export default UserRelations;
