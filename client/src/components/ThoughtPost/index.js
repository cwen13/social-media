import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from '../../utils/helpers';

import "./style.css";

const ThoughtPost = (props) => {

  const handleRemove = async (event) => {
    
  }

  
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
      <div class="actions">
      { props.edit ? <button id={`edit-${props.key}`}>EDIT!</button> : <div></div>}
	{ props.remove ? <button id={`remove-${props.key}`} >Remove!</button> : <div></div>}
	</div>

      </section>

  );
};

export default ThoughtPost;
