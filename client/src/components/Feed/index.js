import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_USER_THOUGHTS } from "./../../utils/queries";
import { getRandom } from "./../../utils/helpers";

import "./style.css";

//Need to get thougts and put them in here
const Feed = () => {

  /* query for 10 random users and a random thought of theirs*/
  // temp dummy data
  let usersData = [{thought:"xfgdf",userName:"don"},
		   {thought:"dsfdxfgdf",userName:"dont"},
		   {thought:"xfgdsdfsdf",userName:"done"},
		   {thought:"xfgdffghfdh",userName:"dond"},
		  ];

  return (
    <div className="feed">
	{/* render out the thought */}
      {usersData.map((thought) => (
	<section className="thought">
	  <p>Thought: ${thought.thought}</p>
	  <p>Info: ${thought.userName}</p>
	</section>
      ))}
    </div>
  );
};
  
export default Feed;
