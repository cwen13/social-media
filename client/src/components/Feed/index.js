import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_USER_THOUGHTS } from "./../../utils/queries";
import { getRandom } from "./../../utils/helpers";

import ThoughtPost from "./../ThoughtPost/"

import "./style.css";

//Need to get thougts and put them in here
const Feed = (props) => {

  // temp dummy data
  let usersData = [{key: "01", thought:"xfgdf", userName:"don"},
		   {key: "02", thought:"dsfdxfgdf", userName:"dont"},
		   {key: "03", thought:"xfgdsdfsdf", userName:"done"},
		   {key: "04", thought:"xfgdffghfdh", userName:"dond"},
		  ];

  

  return (
    <div className="feed">
	{/* render out the thought */}
      {usersData.map((thought) => (
	<ThoughtPost key={thought.key}
		     thought={thought.thought}
		     info={thought.info}
	/>
      ))}
    </div>
  );
};
  
export default Feed;
