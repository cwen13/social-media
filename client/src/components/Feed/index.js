import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { QUERY_USERS, QUERY_USER_THOUGHTS } from "./../../utils/queries";
import { getRandom } from "./../../utils/helpers";

import ThoughtPost from "./../ThoughtPost/"
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

const Feed = () => {
  const { loading, error, data } =  useQuery(QUERY_ALL_THOUGHTS);
  var key = 0;
  
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  
//  console.log("data:", data.getAllThoughts);

  const renderThought = (thought) => {
    return (    	
      <div className="thought" key={thought.id}>
	  <p>User: {thought.userId}</p>
	  <p>Thought: {thought.content}</p>
	</div>
    );
  }
  
  return (
    <div className="feed">
      {(data.getAllThoughts).map(renderThought)}
    </div>
  );
};
  
export default Feed;
