import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import { QUERY_MY_LIKED } from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import Feed from "./../../components/Feed";
import "./../MainStyles/style.css";


const ReThoughts = () => {

  const page = "UserReThoughts"
  
  return(
    <section id="feedContainer">
      <UserInfo id="userInfo" page={page}/>
      <Feed id="feed" page={page}/>
    </section>
  );
};

export default ReThoughts;
