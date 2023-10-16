import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from '../../utils/helpers';

import "./style.css";

const ThoughtPost = (props) => {

  console.log(props);
  
  return (
    <section className="entry">
      <div className="headliner">
	<ul>
	  <li className="userName">{props.userName}</li>
	  <li className="pfp">This is a profile pic</li>
	  <li className="handler">{props.userId}</li>
	</ul>
      </div>
      <div className="thought">
	Thought: {props.thought}
      </div>
      </section>

  );
};

export default ThoughtPost
