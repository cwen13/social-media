import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import {
  QUERY_THOUGHT,
  QUERY_REPLYS,
} from "./../../utils/queries";
import UserInfo from "./../../components/UserInfo";
import ThoughtPost from "./../../components/Posts/ThoughtPost";
//import ThoughtReplys from "./../../components/ThoughtReplys";

import "./../MainStyles/style.css";

const ThoughtPage = () => {
  const page = "ThoughtPage";
  const { postId } = useParams();
  const { userId, loginUSer, logoutUser } = useUserContext();
  
  const { loading: thoughtLoading, error: thoughtError, data: thoughtData } = useQuery(
    QUERY_THOUGHT,
    {
      variables:
      {
	thoughtId: postId
      }
    }
  );

  const {loading: replysLoading, error: replysError, data: replysData } = useQuery(
    QUERY_REPLYS,
    {
      variables:
      {
	thoughtId: postId
      }
    }
  );
 
  if(thoughtLoading) return <p> Loading </p>;
  if(thoughtError) return console.log(thoughtError);
  if(replysLoading)return <p> loading</p>;

  console.log("REPLYS:", replysData.getThoughtReplys);
  
  return(
    <section id="feedContainer">
      <UserInfo id="userInfo"
		page={page}
      />
      <div className="thoughts">
      <div id="mainThought">
      {thoughtLoading && Object.keys(thoughtData).length !== 0 ? "LOADING" :
	  <ThoughtPost userName={thoughtData.getThought.thoughtAuthor.userName}
		       userId={thoughtData.getThought.thoughtAuthor.id}
		       thought={thoughtData.getThought.content}
		       thoughtId={thoughtData.getThought.id}
		       key={thoughtData.getThought.id}
		       page={page}
	  />}
      </div>
      <div id="replys">
      {replysLoading && Object.keys(replysData).length !== 0 ? "LOADING" :
       replysData.getThoughtReplys.map((reply) => <ThoughtPost userName={reply.thoughtAuthor.userName}
							      userId={reply.thoughtAuthor.id}
							      thought={reply.content}
							      thoughtId={reply.id}
							      key={reply.id}
							      page={page}
						  />)}
	</div>
</div>
    </section>);
};


export default ThoughtPage;
