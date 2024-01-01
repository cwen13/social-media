import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client"
import {
} from "./../../../utils/mutations";
import {
  QUERY_THOUGHT,
  QUERY_RETHOUGHT_ID_PAIRS,
  QUERY_RETHOUGHT_ORIGINAL_THOUGHT
} from "./../../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../../utils/queries";

import "./../PostStyling/style.css";

const ReThoughtPost = (props) => {
  
  const {loading: thoughtLoading, error: thoughtError, data: thoughtData } = useQuery(
    QUERY_RETHOUGHT_ORIGINAL_THOUGHT,
    {
      variables:
      {
	reThoughtId: props.reThoughtId
      }
    }
  );

  if(thoughtLoading) return(<>Loading</>);
  const originalThought = thoughtData.getReThoughtOriginalThought;
  
  return (
    <section className="thought">
      <div className="reThought">
	{props.reThought}
      </div>
      <div className="originalThought">
	<section className="authorInfo">
	  <p>
	    <Link to={`/user/${props.userId}`}>
	      UserName: {originalThought.thoughtAuthor.userName}
	      </Link>
	  </p>
	  <p>
	    <Link to={`/thought/${props.thoughtId}`}>
	      Thought Id:{ originalThought.id }
	    </Link>
	  </p>
	</section>
	{originalThought.content}
      </div>
    </section>
  );
};

export default ReThoughtPost;
