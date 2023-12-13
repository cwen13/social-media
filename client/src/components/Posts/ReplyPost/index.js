import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client"
import {
  QUERY_REPLYS
} from "./../../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../../utils/queries";

const ReplyPost = () => {

  let thoughtId = 1;
  
  const { loading: replyLoading, error: replyError, data: replyData } = useQuery(
    QUERY_REPLYS,
    {
      variables:
      {
	thoughtId: thoughtId
      }
    }
  );

  if(replyLoading) return "Loading reply";

  return(
      <section className="thought">
	<div className="currentThought">
	</div>
	<div className="replyThought">
	  </div>
      </section>
  );
};

export default ReplyPost;
