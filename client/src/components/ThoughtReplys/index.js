import React from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_REPLYS,
  QUERY_MY_LIKED
       } from "./../../utils/queries";
import ThoughtPost from "./../ThoughtPost";

const ThoughtReplys = ({ postId }) => {
  const page = "Reply";

  const { loading: likedLoading, error: likedError, data: likedData } = useQuery(QUERY_MY_LIKED);
  const { loading: replyLoading, error: replyError, data: replyData } =
	useQuery(
	  QUERY_REPLYS,
	  { variables: { thoughtReplyOfId: postId } }
	);
  const likedThoughts = (likedData) ? likedData.getAllMyLiked.map(result => result.thoughtId) : [0];
  const isLiked = (thoughtId) => likedThoughts.includes(thoughtId);

  if (likedLoading) return <p> Loading </p>;
  if (replyLoading) return <p> Loading </p>;
  
  return(
    <p>
      Here is where you reply
      {replyData.getReplys.map(reply => <ThoughtPost userName={reply.user.userName}
						     userId={reply.user.id}
						     thought={reply.content}
						     thoughtId={reply.id}
						     thoughtReplyOfId={reply.thoughtReplyOfId}
						     key={reply.id}
						     page={page}
						     liked={isLiked(reply.id)}
					/>)}
    </p>
  );
};

export default ThoughtReplys;
