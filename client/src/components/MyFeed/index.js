import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtPost from "./../ThoughtPost/";
import { QUERY_MY_THOUGHTS } from "./../../utils/queries";

//import "./style.css";

const MyFeed = (props) => {
  const userId = props.userId;
  
    const { loading, error, data } = useQuery(QUERY_MY_THOUGHTS,
					      { variables: { userId }});  
  
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="feed">
      {(data.getAllThoughts).map(thought => <ThoughtPost userName={thought.user.userName}
							 userId={thought.userId}
							 thought={thought.content}
							 key={thought.id}
							 thoughtId={thought.id}
							 edit={props.userId === thought.userId}
							 remove={props.userId === thought.userId}
					    />)}

    </div>
  );
};
  
export default MyFeed;
