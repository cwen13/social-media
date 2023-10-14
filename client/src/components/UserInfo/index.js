import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './../../utils/queries';

const UserInfo = () => {

  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  
  return(
  <section className="userInfo" >
    <h1>=^={data.me.userName}=^=</h1>
    <div className="pfp">
      +==+<br/>
      |--|<br/>
      +==+
    </div>
    <div className="names">
      NAME: {data.me.firstName}
    </div>
    <div className="email">
      EMAIL: {data.me.email}
      </div>
  </section>
  );
};

export default UserInfo;

