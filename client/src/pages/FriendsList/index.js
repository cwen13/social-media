import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_MY_PENDING_REQUESTS,
} from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import FriendListEntry from "./../../components/FriendListEntry";
import { useUserContext } from "./../../utils/UserContext";

import "./../MainStyles/style.css";

const FriendsList = () => {
  const page = "FriendList";
  
  const { friendList } = useUserContext();
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
    </section>
  );
}

export default FriendsList;
