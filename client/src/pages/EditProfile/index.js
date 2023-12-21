import React, { useState } from "react";

import UserInfo from "./../../components/UserInfo";
import "./../MainStyles/style.css";

const EditProfile = () => {
  
  const page="EditProfile";
  
  return(
    <section id="feedContainer">
      <UserInfo page={page} />
    </section>
  );
};
  
export default EditProfile;
