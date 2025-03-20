import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ThoughtPost from "./../Posts/ThoughtPost"
import {
  QUERY_ALL_THOUGHTS,
  QUERY_USER_THOUGHTS,
  QUERY_MY_LIKED,
  QUERY_USER_LIKED,
  QUERY_USER_RETHOUGHTS,
  QUERY_ALL_RETHOUGHT_IDS,
  QUERY_ALL_REPLY_IDS,
  QUERY_MY_BLOCKED_USERS
} from "./../../utils/queries";
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const Feed = (props) => {

  const {
    likedList,
    setLikedList,
    blockedList,
    setBlockedList
  } = useUserContext();

  let [ page, setPage ] = useState(0);
  
  const queryOptions = {
    MyPage : QUERY_USER_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
    Liked: QUERY_USER_LIKED,
    UserReThoughts: QUERY_USER_RETHOUGHTS
  }

  const thoughts = {
    MyPage : "getUserThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
    Liked: "getUserLiked",
    UserReThoughts: "getUserReThoughts"
  };

  const { loading: replyIdsLoading, error: replyIdsError, data: replyIdsData, refetch: replyIdsRefetch } = useQuery(
      QUERY_ALL_REPLY_IDS,
  );

  const { loading: reThoughtIdsLoading, error: reThoughtIdsError, data: reThoughtIdsData, refetch: reThoughtIdsRefetch } = useQuery(
      QUERY_ALL_RETHOUGHT_IDS,
  );
  
  // add page to query string for 
  //  const queryString = (props.page === "MainFeed" && props.userPageId === undefined || props.userPageId === 0)
  //	? "" : { variables: { userId: (props.page === "MyPage" ? props.userId : props.userPageId) }};
  
  //  const queryString = {variables: {page: page, (props.page === "MainFeed" && props.userPageId === undefined || props.userPageId === 0)
  
  
  const queryString = {
    variables: {
      page: page,
      userId: (props.page === "MainFeed" && props.userPageId === undefined || props.userPageId === 0)
	? ""
	: (props.page === "MyPage" ? props.userId : props.userPageId)
    }
  }

  
  const { loading: queryLoading, error: queryError, data: queryData, refetch: refetchData } = useQuery(
    queryOptions[props.page],
    queryString,
  );

  const updateFeed = useCallback(() =>
    {
      refetchData();
      replyIdsRefetch();
      reThoughtIdsRefetch();
    },[]
  );
  
  useEffect(() => {
    (blockedList.filter(blockedUser => parseInt(blockedUser.id) === props.auserPageId).length !== 0)
      ? props.setBlocked(true)
      : props.setBlocked(false);
  }, [blockedList]);

  useEffect(() =>
    {
      updateFeed();
    },[]
  );
    
  if (queryLoading) return "Loading Query";
  if (queryError) return `Q Error ${queryError.message}`;
  if (reThoughtIdsLoading) return "Loading rethought ids";
  if (replyIdsLoading) return "Loading reply ids";
  
  let noData;
  if (queryData === null) {
    switch (props.page) {
    case "MyPage":
      noData = "I have not posted anything yet";
      break;
    case "UserPage":
      noData = "User has not posted anything yet";
      break;
    case "MainFeed":
      noData = "othing to see here";
      break;
    case "Liked":
      noData = "I have not liked anythingyet";
      break;
    case "ReThoughts":
      noData = "I have not rethought anything yet";
      break;
    default:
      noData = null;
      break;
    }
  }

  const isLiked = (thoughtId) => likedList.includes(thoughtId);	
  
  return (
    <div className="feed">
      <ul className="feedPosts">
	{props.blocked
	 ? "BLOCKED"
	 : queryData[thoughts[props.page]].map(thought =>
	   <li key={thought.id} data-key={thought.id} >
	     <ThoughtPost key={thought.id}
			  page={props.page}
			  thoughtId={thought.id}
			  thought={thought.content}
			  userId={thought.thoughtAuthor.id}
			  userName={thought.thoughtAuthor.userName}
			  handle={thought.thoughtAuthor.handle}
			  profilePicture={thought.thoughtAuthor.profilePicture}
			  type={thought.type}
			  liked={isLiked(thought.id)}
			  updateFeed={updateFeed}
	     />
	   </li>
	 )}
      </ul>
      <div className="pager">
	<button onClick={() => setPage(++page)} >
	  Go to next page
	</button>
	
	<button onClick={() => setPage(--page)}>
	  Go to previous page
	</button>
	<br/>
	<div id="page">
	  The page is: {page}
	</div>
      </div>
    </div>
  );
};

export default Feed;

