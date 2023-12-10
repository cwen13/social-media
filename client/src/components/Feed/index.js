import React, { useEffect  } from "react";
// Need to get teh liked list to reload when accessing the page a second time and on
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ThoughtPost from "./../ThoughtPost"
import {
  QUERY_ALL_THOUGHTS,
  QUERY_USER_THOUGHTS,
  QUERY_MY_THOUGHTS,
  QUERY_MY_LIKED,
  QUERY_MY_RETHOUGHTS,
  QUERY_USER_LIKED,
  QUERY_USER_RETHOUGHT
} from "./../../utils/queries";

import "./style.css";

const Feed = (props) => {
  const userPageId = useParams().userId;
  
  const queryOptions = {
    MyPage : QUERY_MY_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
    Liked: QUERY_USER_LIKED,
    ReThoughts: QUERY_MY_RETHOUGHTS
  };

  const thoughts = {
    MyPage : "getMyThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
    Liked: "getUserLiked",
    ReThoughts: "getUserReThoughts"
  };


  const { loading: likedLoading, error: likedError, data: likedData, refresh: likedRefresh } = useQuery(
    QUERY_MY_LIKED,
    {
      refetchQueries:
      [
	QUERY_MY_LIKED,
	"getAllMyLiked"
      ]
    }
  );

  const queryString = (props.page === "MainFeed" && userPageId === undefined || userPageId === 0) ? "" : `{variables:{userId: ${userPageId}}}`;

  console.log("query string:",queryString);
  
  
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
    queryOptions[props.page],
    queryString    
  );

  if (likedLoading) return "Loading";
  if (queryLoading) return "Loading";
  if (queryError) return `Q Error ${queryError.message}`;
  
  const likedThoughts = (likedData) ? likedData.getAllMyLiked.map(result => result.id) : [];
  const isLiked = (thoughtId) => likedThoughts.includes(thoughtId);

  console.log(queryData)
  
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
      
  
  return (
	<div className="feed">
	  {(noData === null) ? noData :
	    queryData[thoughts[props.page]].map(thought =>
	    <ThoughtPost userName={thought.user.userName}
			 userId={thought.user.id}
			 thought={thought.content}
			 thoughtId={thought.id}
			 thoughtReplyOfId={thought.thoughtReplyOfId}
			 key={thought.id}
			 page={props.page}
			 isReThought={thought.isReThought}
			 originalThoughtId={thought.thoughtReplyOfId}
			 liked={isLiked(thought.id)}
	    />)}
	</div>
  );
};
	  
export default Feed;

