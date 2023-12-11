import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client"
import {
} from "./../../../utils/mutations";
import {
  QUERY_REPLYS
} from "./../../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../../utils/queries";

const ReplyPost = (props) => {

  const { loading: replyLoading, error: replyError, data: replyData } = useQuery(
    QUERY_REPLYS,
    {
      variables:
      {
	thoughtId: props.thoughtId
      }
    }
  );

  if(replyLoading) return "Loading reply";

  return(
      <section className="thought">
	<div className="currentThought">
	  {props.thought}
	</div>
	<div className="replyThought">
	  {replyThought}
	  </div>
      </section>
  );
};

export default ReplyPost;
