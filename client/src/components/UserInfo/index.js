import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './../../utils/queries';

const UserInfo = () => {

  const { loading, error, data } = useQuery(QUERY_ME);

  // errors out with data as undefined if only use ==
  let userMe = data === null ? data.me : { userName: "Luky",
					   firstName:"Lucky",
					   email:"licky@we.com" };
  
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  
  return(
    <section className="userInfo" >
      <h1>=^={userMe.userName}=^=</h1>
      <div className="pfp">
	+==+<br/>
	|--|<br/>
	+==+
      </div>
      <div className="names">
	NAME: {userMe.firstName}
      </div>
      <div className="email">
	EMAIL: {userMe.email}
      </div>
    </section>
  );
};

export default UserInfo;

