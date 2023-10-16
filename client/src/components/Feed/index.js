import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { QUERY_USERS, QUERY_USER_THOUGHTS } from "./../../utils/queries";
import { getRandom } from "./../../utils/helpers";

import ThoughtPost from "./../ThoughtPost/"
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

const Feed = () => {
  var key = 0;
  const { loading, error, data } =  useQuery(QUERY_ALL_THOUGHTS);
  
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
 
  return (
    <div className="feed">
      {(data.getAllThoughts).map(thought => <ThoughtPost userName={thought.user.userName}
							 userId={thought.userId}
							 thought={thought.content}
							 key={key++} />)}
    </div>
  );
};
  
export default Feed;
