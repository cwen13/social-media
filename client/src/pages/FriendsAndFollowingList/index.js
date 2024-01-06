import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_MY_PENDING_REQUESTS,
} from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import FriendListEntry from "./../../components/FriendListEntry";
import FollowingUserEntry from "./../../components/FollowingUserEntry";
import { useUserContext } from "./../../utils/UserContext";

import "./../MainStyles/style.css";

const FriendsAndFollowingList = () => {
  const page = "FriendAndFollowList";
  
  const { friendList,
	  setFriendList,
	  followList,
	  setFollowList } = useUserContext();
  const [ pendingRequests, setPendingRequests ] = useState([]);
  
  const { loading: pendingRequestsLoading, error: pendingRequestsError, data: pendingRequestsData } = useQuery(
    QUERY_MY_PENDING_REQUESTS,
    {
      refetchQueries:
      [
	QUERY_MY_PENDING_REQUESTS,
	"getMYPendingRequests"
      ]
    }
  );

  useEffect(() => {
    if(!pendingRequestsLoading && !pendingRequestsError && pendingRequestsData !== undefined) {
      setPendingRequests(
	[
	  ...pendingRequests,
	  ...pendingRequestsData.getMyPendingRequests
	  
	]
      );
    };
    if(followList !== undefined) {
      setFollowList(
	[
	  ...followList
	]
      );
    }; 
  }, [pendingRequestsLoading, pendingRequestsError, pendingRequestsData]);
  
  if(pendingRequestsLoading) return "Loading Pending Friends";
  
  
  return(
    <section id="feedContainer">
      <UserInfo page={page} />      
      <section id="friendLists">
	<h3>PENDING FRIEND REQUESTS</h3>
	<ul id="pendingFriends">
	  {pendingRequests.map((friend) =>
	    <FriendListEntry friendId={friend.requestingFriend.id}
			     friendName={friend.requestingFriend.userName}
			     friendHandle={friend.requestingFriend.handle}
			     friendProfilePicture={friend.requestingFriend.profilePicture}
			     typeOfFriend="Request"
	    />)}
	</ul>
	<h3>FRIENDS</h3>
	<ul id="currentFriends">
	  {friendList.map((friend) =>
	    <FriendListEntry friendId={friend.id}
			     friendName={friend.userName}
			     friendHandle={friend.handle}
			     friendProfilePicture={friend.profilePicture}
			     typeOfFriend="Friend"
	    />)}
	</ul>
      </section>
      <section id="followingList">
	<h3>Following</h3>
	<ul id="following">
	  {followList.map((follow) =>
	    <FollowingUserEntry followingId={follow.id}
				followingName={follow.userName}
				followHandle={follow.handle}
				followProfilePicture={follow.profilePicture}
				typeOfFriend="Following"
	      />
	  )}
	  </ul>
      </section>
    </section>
  );
}

export default FriendsAndFollowingList;
