import React, { useState } from "react";

import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

function UserPage() {

  const page = "UserPage"
  
  return(
    <section id="feedContainer">      
      <Feed id="feed"
	    page={page}/>
      </section>
  );
};

export default UserPage;
