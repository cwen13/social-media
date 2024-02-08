import React, { useState, useEffect  } from "react";
// Need to get teh liked list to reload when accessing the page a second time and on
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

  let userPageId = useParams().userId;

  const [ recentThought, setRecentThought ] = useState({});
  
  const {
    userId,
    likedList,
    setLikedList,
    blockedList
  } = useUserContext();

  userPageId = (userPageId !== undefined) ? userPageId : userId;
  
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

  const { loading: replyIdsLoading, error: replyIdsError, data: replyIdsData } = useQuery(
      QUERY_ALL_REPLY_IDS,
  );
  const { loading: reThoughtIdsLoading, error: reThoughtIdsError, data: reThoughtIdsData } = useQuery(
      QUERY_ALL_RETHOUGHT_IDS,
  );
  
  const queryString = (props.page === "MainFeed" && userPageId === undefined || userPageId === 0)
	? "" : { variables: { userId: userPageId }};
  
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
    queryOptions[props.page],
      queryString,
  );

  if (queryLoading) return "Loading Query";
  if (queryError) return `Q Error ${queryError.message}`;
  if (reThoughtIdsLoading) return "Loading rethought ids";
  if (replyIdsLoading) return "Loading reply ids";
  
  const reThoughtIds = new Set(reThoughtIdsData.getAllReThoughtIds.map(entry => entry.reThoughtThoughtId));
  const isReThought = (thoughtId) => reThoughtIds.has(thoughtId);

  const replyIds = new Set(replyIdsData.getAllReplyIds.map(entry => entry.replyThoughtId));
  const isReply = (thoughtId) => replyIds.has(thoughtId);

  const isLiked = (thoughtId) => likedList.includes(thoughtId);

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

  const blockedUser = (postsUserId) => {
    return userId !== postsUserId && blockedList.filter(blockedUser => blockedUser.id === postsUserId).length !== 0;
  }
  
  const RenderBlockedThought = () => {
    return(
      <li className="authorInfo">
	  <h2>
	    You have blocked this user or there are no thoughts here
	  </h2>
      </li>
    );
  };

  const ThoughtPicker = () => {
    
  }
  
  return (
    <div className="feed">
      <ul className="feedPosts">
	{queryData[thoughts[props.page]].map(thought =>
	    <li key={thought.id} data-key={thought.id} >
	      <ThoughtPost key={thought.id}
			   page={props.page}
			   thoughtId={thought.id}
			   thought={thought.content}
			   liked={isLiked(thought.id)}
			   isReThought={isReThought(thought.id)}
			   isReply={isReply(thought.id)}
			   userId={thought.thoughtAuthor.id}
			   userName={thought.thoughtAuthor.userName}
			   handle={thought.thoughtAuthor.handle}
			   profilePicture={thought.thoughtAuthor.profilePicture}
	      />
	    </li>
	)}
      </ul>
    </div>
  );
};

export default Feed;

