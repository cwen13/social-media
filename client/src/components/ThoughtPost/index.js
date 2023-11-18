import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client"
import {
  REMOVE_THOUGHT,
  UPDATE_THOUGHT,
  ADD_LIKED,
} from "./../../utils/mutations";
import {
  QUERY_MY_LIKED
} from "./../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

import { useUserContext } from "./../../utils/UserContext";

const ThoughtPost = (props) => {

  const { userId, loginUser, logoutUser } = useUserContext();
  const textAreaRef = useRef(null);

  const [ isEditing, setIsEditing ] = useState(false);
  const [ thoughtText, setThoughtText ] = useState(props.thought);
  const [ cursorPosition, setCursorPosition ] = useState({ start:0, end: 0 });
  const [ isLiked, setIsLiked ] = useState(props.liked);
  
  const [ removeThought, { error: removeError }] = useMutation(REMOVE_THOUGHT,
						  { refetchQueries:
						    [ QUERY_ALL_THOUGHTS,
						      "getAllThoughts"
						    ]});
  const [ updateThought, { error: updateError }] =  useMutation(UPDATE_THOUGHT,
						   { refetchQueries:
						     [ QUERY_ALL_THOUGHTS,
						       "getAllThoughts"
						     ]});
  const [ likedThought, { error: likedError }] = useMutation(ADD_LIKED,
						      { refetchQueries:
							[ QUERY_ALL_THOUGHTS,
							  "getAllThoughts"
							]});


  
  useEffect(() => {
    if(isEditing) {
      textAreaRef.current.focus();
      textAreaRef.current.selectionStart = cursorPosition.start;    
    }
  },[thoughtText]);
  
  const handleLiked  = async (event) => {
    event.preventDefault();
    try {
      if(userId) {
	const likedResponse = await likedThought({
	  variables: {
	    thoughtId: props.thoughtId
	  }
	});
	setIsLiked(true);
      }
    } catch (e) {
      throw new Error("No thought removed");
      console.log(e);
    }
  };
  
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
    };
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updateThoughtResponse = await updateThought({
	variables: {
	  thoughtId: props.thoughtId,
	  content: thoughtText
	}});
      setIsEditing(false);
    } catch (e) {
      console.log("Thought update was not commited to memory")
      console.log(e)
    }; 
  };

  const handleChange = async (event) => {
    setThoughtText(event.currentTarget.value);
    setCursorPosition({ start: event.target.selectionStart,
			end: event.target.selectionEnd
		      });
    
  };

  const MyInteractivity = () => {
    return(<>
	     <button id={`edit-${props.thoughtId}`}
		     onClick={() => setIsEditing(!isEditing)}>EDIT!
	     </button> 
	     <button id={`remove-${props.thoughtId}`}
		     onClick={handleRemove}>Remove!
	     </button> 
	   </>
	  );
  };

  const AllInteractivity = () => {
    return(<>
	     <button id={`liked-${props.thoughtId}`}
		     className={isLiked ? "liked-thought" : "not-liked-thought"}
		     onClick={handleLiked}>
	       LIKE!
	     </button> 
	     <button id={`reply-${props.thoughtId}`}
		     onClick={handleRemove}>
	       REPLY!
	     </button>
	     <button id={`rethought-${props.thoughtId}`}
		     onClick={handleRemove}>
	       RETHOUGHT!
	     </button>
	   </>
	  );
  };
	     
  const RenderThought = () => {
    return (
      <section className="thought">
	Thought: {props.thought}
	<div className="actions">
	  {(props.userId===userId) || (props.page==="UserProfile")
	   ? <MyInteractivity />
	   : <AllInteractivity />
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
		  onChange={handleChange}
		  ref={textAreaRef}>
	</textarea>
	<div className="actions">
	  <button id={`saveEdit-${props.thoughtId}`}
		  onClick={handleSave}> SAVE </button>
	</div>
      </section>
    );
  };

  return (
    <section className="entry">
      <div className="headliner">
	<ul>
	  <li className="thoughtId">{props.thoughtId}</li>
	  {(props.page==="MainFeed") ? <>
					 <li className="userName">
					   <Link to={`/user/${props.userId}`}>
					     {props.userName}
					   </Link>
					 </li>
					<li className="pfp">This is a profile pic</li>
					<li className="userId">{props.userId}</li>
				      </> : <li> ME </li>}
	</ul>
      </div>
      {isEditing ? <RenderEdit /> : <RenderThought />}
    </section>
  );
};

export default ThoughtPost;
