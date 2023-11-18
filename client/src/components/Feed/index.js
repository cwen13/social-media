import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtPost from "./../ThoughtPost/"
import { QUERY_ALL_THOUGHTS, QUERY_MY_THOUGHTS } from "./../../utils/queries";

import "./style.css";

const Feed = ({ page }) => {
  const queryOptions = { UserProfile : QUERY_MY_THOUGHTS,
			 MainFeed :  QUERY_ALL_THOUGHTS  }

  const { loading, error, data } = useQuery(queryOptions[page]);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  const thoughts = (queryOptions[page] === QUERY_MY_THOUGHTS) ? "getMyThoughts" :
	"getAllThoughts";

  return (
	<div className="feed">
	  {data[thoughts].map(thought => <ThoughtPost userName={thought.user.userName}
						      userId={thought.user.id}
						      thought={thought.content}
						      thoughtId={thought.id}
						      key={thought.id}
						      page={page}
					 />)}
	  
	</div>
  );
};
  
export default Feed;
