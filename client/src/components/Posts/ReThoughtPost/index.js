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

  const [ thoughtType, setThoughtType ] = useState("");
  
  const {loading: thoughtLoading, error: thoughtError, data: thoughtData } = useQuery(
    QUERY_RETHOUGHT_ORIGINAL_THOUGHT,
    {
      variables:
      {
	reThoughtId: props.reThoughtId
      }
    }
  );

  useEffect(() => {
    if(!thoughtLoading && !thoughtError && thoughtData != undefined){
      let id = thoughtData.getReThoughtOriginalThought.id;
      if(props.isReThought(id)) {
	setThoughtType("ReThought");
      } else if (props.isReply(id)) {
	setThoughtType("Reply");
      } else {
	setThoughtType("Thought");
      }
    }
  }, [thoughtLoading, thoughtError, thoughtData]);

  
  if(thoughtLoading) return(<>Loading</>);
  const originalThought = thoughtData.getReThoughtOriginalThought;
  
  return (
    <section className="thought">
      <div className="reThought">
	{props.reThought}
      </div>
      <section className="originalReThought">
	<div className="authorInfoReThought">
	  <Link to={`/user/${originalThought.thoughtAuthor.id}`}>
	    {originalThought.thoughtAuthor.userName}({originalThought.thoughtAuthor.id})
	    <br/>
	    {originalThought.thoughtAuthor.handle}
	  </Link>
	  <Link to={`/thought/${originalThought.id}/Thought`}>
	    { originalThought.id }
	  </Link>
	</div>
	<div className="originalReThoughtThought">
	  {originalThought.content}
	</div>
      </section>
    </section>
  );
};

export default ReThoughtPost;
