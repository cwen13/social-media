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
  QUERY_MY_RETHOUGHTS
} from "./../../utils/queries";

import "./style.css";

const Feed = ({ page }) => {
  const userId = useParams().userId;
  
  const queryOptions = {
    MyPage : QUERY_MY_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
    Liked: QUERY_MY_LIKED,
    MyReThoughts: QUERY_MY_RETHOUGHTS
  };

  const thoughts = {
    MyPage : "getMyThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
    Liked: "getAllMyLiked",
    MyReThoughts: "getMyReThoughts"
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

  
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
    queryOptions[page],
    (page==="UserPage")
      ? {
	variables:
	{
	  userId
	}
      }
    : "");

  if (likedLoading) return "Loading";
  if (queryLoading) return "Loading";
  if (queryError) return `QError ${queryError.message}`;
  
  const likedThoughts = (likedData) ? likedData.getAllMyLiked.map(result => result.id) : [0];
  const isLiked = (thoughtId) => likedThoughts.includes(thoughtId);

  return (
	<div className="feed">
	  {queryData[thoughts[page]].map(thought =>
	    <ThoughtPost userName={thought.user.userName}
			 userId={thought.user.id}
			 thought={thought.content}
			 thoughtId={thought.id}
			 thoughtReplyOfId={thought.thoughtReplyOfId}
			 key={thought.id}
			 page={page}
			 isReThought={thought.isReThought}
			 originalThoughtId={thought.thoughtReplyOfId}
			 liked={isLiked(thought.id)}
	    />)}
	</div>
  );
};
	  
export default Feed;

