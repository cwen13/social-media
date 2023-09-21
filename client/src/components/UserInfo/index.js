import React from "react";

const UserInfo = (props) => (
  <section className="userInfo" >
    <h1>=^=${props.userName}=$=</h1>
    <div className="pfp">
      +==+
      |  |
      +==+
    </div>
    <div className="names">
      NAME: ${props.firstName} ${props.lastName}
    </div>
    <div className="email">
      EMAIL: ${props.email}
      </div>
  </section>
);

export default UserInfo;

