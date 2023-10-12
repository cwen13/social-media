import React from "react";
import Feed from "./../components/Feed/"
import RecentThoughts from "./../components/RecentThoughts/"
import UserInfo from "./../components/UserInfo";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


const MainFeed = (props) => {

  const { data } = useQuery(QUERY_ME);

  let user = data ? data.user : null;
  console.log(data);

  return(
	<section className="mainFeed">
	  <ul>
	    <li> <UserInfo User={user} /> </li>
	    <li> <Feed /> </li>
	    <li> <RecentThoughts /> </li>
	  </ul>
	</section>
  );

};

export default MainFeed;
