import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client"
import {
  QUERY_REPLY_ORIGINAL_THOUGHT
} from "./../../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../../utils/queries";

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
      <section className="thought">
	<div className="replyThought">
	  {props.reply}
	</div>
	<div className="currentThought">
	  {originalThought.content}
	  </div>
      </section>
  );
};

export default ReplyPost;
