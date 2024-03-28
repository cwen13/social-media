import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import {
  QUERY_THOUGHT,
  QUERY_REPLYS,
  QUERY_RETHOUGHT
} from "./../../utils/queries";

import UserInfo from "./../../components/UserInfo";
import ThoughtPost from "./../../components/Posts/ThoughtPost";
//import ThoughtReplys from "./../../components/ThoughtReplys";

import "./../MainStyles/style.css";

const ThoughtPage = () => {
  const page = "ThoughtPage";

  const {
    postId,
    postType
  } = useParams();

  const userPageId = localStorage.getItem("user_id");
  
  const {
    userId,
    loginUSer,
    logoutUser,
    likedList
  } = useUserContext();
  
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

//  const { loading: reThoughtLoading, error: reThoughtError, data: reThoughtData } = useQuery(
//    QUERY_RETHOUGHT,
//    {
//      variables:
//      {
//	originalThoughtId: postId
//      }
//    }
//  );
  
  useEffect(() => {
    console.log("REPLYS HIT");
    console.log("REPLYDATA:", replysData);
    console.log("REPLYLOADING:", replysLoading);
    console.log("REPLYERROR:", replysError);
    
    if(replysData != undefined && Object.keys(replysData).length != 0)
      console.log("REPLYS:", replysData);
  }, [replysLoading, replysError, replysData]);  
  
  if(thoughtLoading) return "Loading";
  if(thoughtError) return console.log(thoughtError);
  if(replysLoading)return "Loading"
  
  const isLiked = (thoughtId) => likedList.includes(thoughtId);

  return(
    <section id="feedContainer">
      <UserInfo id="userInfo"
		userPageId={userPageId}
		page={page}
      />
      <div className="thoughts">
	<div id="mainThought">
	  {thoughtLoading && Object.keys(thoughtData).length !== 0 && thoughtData.getThought !== null ? "LOADING" :
	   <ThoughtPost key={thoughtData.getThought.id}
			userName={thoughtData.getThought.thoughtAuthor.userName}	    
			userId={thoughtData.getThought.thoughtAuthor.id}
			thought={thoughtData.getThought.content}
			thoughtId={thoughtData.getThought.id}
			liked={isLiked(thoughtData.getThought.id)}
			profilePicture={thoughtData.getThought.thoughtAuthor.profilePicture}
			page={page}
	   />}
	</div>
	<div id="replys">
	  REPLYS WILL GO HERE
	</div>
      </div>
    </section>);
};


export default ThoughtPage;

//	  {replysLoading && Object.keys(replysData).length !== 0 && replysData.getThoughtReplys !== undefined
//	   ? (!replysError && Object.keys(replysData) === 0 ? "NO REPLYS" :  "LOADING")
//	   : replysData.getThoughtReplys.map((reply) =>
//	     <ThoughtPost userName={reply.thoughtAuthor.userName}
//			  userId={reply.thoughtAuthor.id}
//			  profilePicture={reply.thoughtAuthor.profilePicture}
//			  thought={reply.content}
//			  thoughtId={reply.id}
//			  key={reply.id}
//			  page={page}
//	     />)
