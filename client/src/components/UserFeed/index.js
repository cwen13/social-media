import React from "react";

import { useQuery } from "@apollo/client";

import { QUERY_MY_THOUGHTS } from "./../../utils/queries";

import MyFeed from "./../MyFeed";
import ThoughtPost from "./../ThoughtPost";

const UserFeed = (props) => {
  const { loading, error, data } = useQuery(QUERY_MY_THOUGHTS);
   
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="myFeed">
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

export default UserFeed;
