import React, { useState } from "react";

import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";

function UserPage() {

  const page = "UserPage"
  
  return(
    <section id="feedContainer">      
      <ul className="userFeed">
	<li id="feed">
	  <Feed page={page}/>
	</li>
      </ul>
      </section>
  );
};

export default UserPage;
