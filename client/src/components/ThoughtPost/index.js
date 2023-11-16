import React, { useContext, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../utils/helpers';
import { useMutation } from "@apollo/client"
import { REMOVE_THOUGHT, UPDATE_THOUGHT } from "./../../utils/mutations";
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

import { useUserContext } from "./../../utils/UserContext";

const ThoughtPost = (props) => {

  const { userId, loginUser, logoutUser } = useUserContext();

  const [ isEditing, setIsEditing ] = useState(false);
  const [ thoughtText, setThoughtText ] = useState(props.thought.toString());
  
  const [ removeThought, { removeError }] = useMutation(REMOVE_THOUGHT,
						  { refetchQueries:
						    [ QUERY_ALL_THOUGHTS,
						      "getAllThoughts"
						    ]});
  const [ updateThought, { updateError }] =  useMutation(UPDATE_THOUGHT,
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

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      console.log("ThoughtText:", thoughtText);
      const updateThoughtResponse = await updateThought({
	variables: {
	  thoughtId: props.thoughtId,
	  content: thoughtText
	}});
      console.log("THOUGHT RES:",updateThoughtResponse);
      setIsEditing(false);
    } catch (e) {
      console.log("Thought update was not commited to memory")
      console.log(e)
    }; 
  };

  const handleChange = (event) => {
    setThoughtText(event.currentTarget.value);
    console.log("ThoughtTEXT(after set):", thoughtText);
  };
  
  const RenderThought = () => {
    return (
      <section className="thought">
	Thought: {props.thought}
	<div className="actions">
	  {!(props.userId === userId) ? <span>ACTIONS</span> :
	   <>
	     <button id={`edit-${props.thoughtId}`}
		     onClick={() => setIsEditing(!isEditing)} >EDIT!</button> 
	     <button id={`remove-${props.thoughtId}`}
		     onClick={handleRemove} >Remove!</button>
	   </>
	  }
	</div>
      </section>
    );
  };
  
  const RenderEdit = () => {
    return (
      <section className="thought">
	Thought:
	<textarea id="thoughtTextBox"
		  name="thoughtText"
		  spellCheck="true"
		  defaultValue={thoughtText}
		  onChange={handleChange}>
	</textarea>
	<div className="actions">
	  <button id={`saveEdit-${props.thoughtId}`}
		  onClick={handleSave}> SAVE </button>
	</div>
      </section>
    );
  };

  const MemoRenderEdit = memo(RenderEdit);
  
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
      {isEditing ? <MemoRenderEdit /> : <RenderThought />}
    </section>
  );
};

export default ThoughtPost;
