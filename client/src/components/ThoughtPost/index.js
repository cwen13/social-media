import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../utils/helpers';
import { useMutation } from "@apollo/client"
import { REMOVE_THOUGHT } from "./../../utils/mutations";
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

import { useUserContext } from "./../../utils/UserContext";

const ThoughtPost = (props) => {

  const { userId, loginUser, logoutUser } = useUserContext();
  const [ removeThought, { error }] = useMutation(REMOVE_THOUGHT,
						  { refetchQueries:
						    [ QUERY_ALL_THOUGHTS,
						      "getAllThoughts"
						    ]});
  
  const handleRemove = async (event) => {
    event.preventDefault();
    try {
      const removeResponse = await removeThought({
	variables: {
	  thoughtId: props.thoughtId
	}});
    } catch (e) {
      throw new Error("No thought removed");
      console.log(e);
    }
  };
  
  const interactivity = () => {
    
    return (
      <>
	<button id={`edit-${props.thoughtId}`} >EDIT!</button> 
	<button id={`remove-${props.thoughtId}`}onClick={handleRemove} >Remove!</button>
      </>
    );
  };
  
  return (

    <section className="entry">
      <div className="headliner">
	<ul>
	  <li className="thoughtId">{props.thoughtId}</li>
	  <li className="userName">{props.userName}</li>
	  <li className="pfp">This is a profile pic</li>
	  <li className="handler">{props.userId}</li>
	</ul>
      </div>
      <div className="thought">
	Thought: {props.thought}
      </div>
      <div className="actions">
	{props.userId == userId ? interactivity() : <span>ACTIONS</span>}
	</div>

      </section>

  );
};

export default ThoughtPost;
