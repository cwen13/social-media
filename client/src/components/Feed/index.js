import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtPost from "./../ThoughtPost/"
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

const Feed = (props) => {
  const { loading, error, data } = useQuery(QUERY_ALL_THOUGHTS);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
	<div className="feed">
	  {(data.getAllThoughts).map(thought => <ThoughtPost userName={thought.user.userName}
							     userId={thought.user.id}
							     thought={thought.content}
							     key={thought.id}
							     thoughtId={thought.id}
						/>)}
	  
	</div>
  );
};
  
export default Feed;
