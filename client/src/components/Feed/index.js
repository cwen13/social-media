import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { QUERY_USERS, QUERY_USER_THOUGHTS } from "./../../utils/queries";
import { getRandom } from "./../../utils/helpers";

import ThoughtPost from "./../ThoughtPost/"
import { QUERY_THOUGHTS } from "./../../utils/queries";
import "./style.css";


const QT = gql`
query getThoughts{
  getThoughts {
    userId
    content
  }
}
`;


//Need to get thougts and put them in here
const Feed = () => {
  const { loading, error, data } = useQuery(QT);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  
  return (
    <div className="feed">
      {console.log(error)}
      {data.map((thought) => (
	<ThoughtPost 
		     thought={thought.content}
		     info={thought.id}
	/>
	))}
      Here is a little text
    </div>
  );
};
  
export default Feed;
