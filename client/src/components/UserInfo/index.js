import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_USER } from './../../utils/queries';

const UserInfo = (props) => {

  const { data } = useQuery(QUERY_USER);
  const user  = data({variables: {userId: props.user.id}});
  console.log("User info:", user);
  
  return(
  <section className="userInfo" >
    <h1>=^=${props.user.id}=$=</h1>
    <div className="pfp">
      +==+
      |  |
      +==+
    </div>
    <div className="names">
      NAME: ${} ${}
    </div>
    <div className="email">
      EMAIL: ${props.email}
      </div>
  </section>
  );
};

export default UserInfo;

