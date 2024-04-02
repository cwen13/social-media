import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import {
  QUERY_THOUGHT,
  QUERY_REPLYS,
  QUERY_RETHOUGHT,
  QUERY_ALL_RETHOUGHT_IDS,
  QUERY_ALL_REPLY_IDS,
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

  const { loading: replyIdsLoading, error: replyIdsError, data: replyIdsData, refetch: replyIdsRefetch } = useQuery(
    QUERY_ALL_REPLY_IDS,
  );
  
  const { loading: reThoughtIdsLoading, error: reThoughtIdsError, data: reThoughtIdsData, refetch: reThoughtIdsRefetch } = useQuery(
    QUERY_ALL_RETHOUGHT_IDS,
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
			type={thoughtData.getThought.type}
	   />}
	</div>
	<div id="replys">
	  <div id="replyHeadline"> REPLYS </div>
	  {replysLoading && Object.keys(replysData).length !== 0 && replysData.getThoughtReplys !== undefined
	   ? (!replysError && Object.keys(replysData) === 0 ? "NO REPLYS" :  "LOADING")
	   : replysData.getThoughtReplys.map((reply) =>
	     <ThoughtPost userName={reply.thoughtAuthor.userName}
			  userId={reply.thoughtAuthor.id}
			  profilePicture={reply.thoughtAuthor.profilePicture}
	       		  thought={reply.content}
			  thoughtId={reply.id}
			  key={reply.id}
			  page={page}
			  type={reply.type}
	     />)}

	</div>
      </div>
    </section>);
};


export default ThoughtPage;

