import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
//import "./style.css";

const EditProfile = () => {
  
  const page="EditProfile";
  
  return(
    <section id="userEdit">
      <UserInfo page={page} />
    </section>
  );
};
  
export default EditProfile;
