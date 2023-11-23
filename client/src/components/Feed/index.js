import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ThoughtPost from "./../ThoughtPost"
import {
  QUERY_ALL_THOUGHTS,
  QUERY_MY_THOUGHTS,
  QUERY_USER_THOUGHTS,
  QUERY_MY_LIKED
} from "./../../utils/queries";

import "./style.css";

const Feed = ({ page }) => {
  const { userId } = useParams();

  const queryOptions = {
    UserProfile : QUERY_MY_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
  };
  const thoughts = {
    UserProfile : "getMyThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
  };

  const { loading: likedLoading, error: likedError, data: likedData } = useQuery(QUERY_MY_LIKED);
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
    queryOptions[page],
    (page==="UserPage")
      ? {variables: {userId}}
    : "");
  
  
  const likedThoughts = (likedData) ? likedData.getAllMyLiked.map(result => result.thoughtId) : [0];
  const isLiked = (thoughtId) => likedThoughts.includes(thoughtId);
  
  if (likedLoading) return "Loading";
  if (queryLoading) return "Loading...";
  if (queryError) return `Error ${queryError.message}`;


  return (
	<div className="feed">
	  {queryData[thoughts[page]].map(thought => <ThoughtPost userName={thought.user.userName}
								 userId={thought.user.id}
								 thought={thought.content}
								 thoughtId={thought.id}
								 thoughtReplyOfId={thought.thoughtReplyOfId}
								 key={thought.id}
								 page={page}
								 liked={isLiked(thought.id)}
						    />)}
	</div>
  );
};
	  
export default Feed;

