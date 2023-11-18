import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ThoughtPost from "./../ThoughtPost/"
import { QUERY_ALL_THOUGHTS, QUERY_MY_THOUGHTS, QUERY_USER_THOUGHTS } from "./../../utils/queries";

import "./style.css";

const Feed = ({ page }) => {
  const { userId } = useParams();
  console.log(userId);
  console.log(page);
  const queryOptions = { UserProfile : QUERY_MY_THOUGHTS,
			 UserPage: [ QUERY_USER_THOUGHTS,
				     {
				       variables: { userId }
				     }],
			 MainFeed :  QUERY_ALL_THOUGHTS  }

  const { loading, error, data } = useQuery(queryOptions[page],
					    );

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
