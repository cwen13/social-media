import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client"
import {
  QUERY_REPLY_ORIGINAL_THOUGHT,
  QUERY_ALL_RETHOUGHT_IDS,
  QUERY_ALL_REPLY_IDS,
} from "./../../../utils/queries";

import "./../PostStyling/style.css";

const ReplyPost = (props) => {
  
  const { loading: replyLoading, error: replyError, data: replyData } = useQuery(
    QUERY_REPLY_ORIGINAL_THOUGHT,
    {
      variables:
      {
	replyId: props.replyId
      }
    }
  );
  
  if(replyLoading) return "Loading reply";

  const originalThought = replyData.getReplyOriginalThought;
  
  return(
    <section className="replyBox thought">
      <section className="originalThought">
	<section className="originalAuthor">
	  <Link  to={`/user/${originalThought.thoughtAuthor.id}`}>
	    {originalThought.thoughtAuthor.userName}
	  </Link>
	  <Link to={`/thought/${originalThought.id}/${originalThought.type}`}>
	    Thought: {originalThought.id}
	  </Link>
	</section>	
	<div className="repliedToThought">
	  {originalThought.content}
	</div>
      </section>
      <section className="replyThought">
	{props.reply}
      </section>
    </section>
  );
};

export default ReplyPost;
