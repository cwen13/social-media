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
  REPLY_TO_THOUGHT,
} from "./../../utils/mutations";
import {
  QUERY_MY_LIKED
} from "./../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

import { useUserContext } from "./../../utils/UserContext";

const ThoughtPost = (props) => {
  
  const thoughtAreaRef = useRef(null);
  const replyAreaRef = useRef(null);
  const { userId, loginUser, logoutUser } = useUserContext();

  const [ isEditing, setIsEditing ] = useState(false);
  const [ thoughtText, setThoughtText ] = useState(props.thought);
  const [ cursorPositionThought, setCursorPositionThought ] = useState({ start:0, end: 0 });
  const [ cursorPositionReply, setCursorPositionReply ] = useState({ start:0, end: 0 });
  const [ isLiked, setIsLiked ] = useState(props.liked);
  const [ replying, setReplying ] = useState(false);
  const [ replyContent, setReplyContent ] = useState("");
  
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
  const [ replyToThought, { error: replyError }] = useMutation(REPLY_TO_THOUGHT,
							       { refetchQueries:
								 [ QUERY_ALL_THOUGHTS,
								   "getAllThoughts"
								 ]});
  
  
  useEffect(() => {
    if(isEditing) {
      thoughtAreaRef.current.focus();
      thoughtAreaRef.current.selectionStart = cursorPositionThought.start;    
    }
  },[thoughtText]);

    useEffect(() => {
    if(replying) {
      replyAreaRef.current.focus();
      replyAreaRef.current.selectionStart = cursorPositionReply.start;
    }
  },[replyContent]);
  
  const handleReplySubmit = async () => {
    try {
      const reply = await replyToThought({
	variables: {
	  content: replyContent,
	  thoughtReplyOfId: props.thoughtId
	}});
      setReplyContent("");
      setReplying(false);
    } catch (e) {
      throw new Error("You did not reply to the thought!");
      console.log(e);
    }
  };
    
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

  const handleChangeThought = async (event) => {
    setThoughtText(event.currentTarget.value);
    setCursorPositionThought({ start: event.target.selectionStart,
			       end: event.target.selectionEnd
			     });
    
  };

  const handleChangeReply = async (event) => {

    setReplyContent(event.target.value);
    setCursorPositionReply({ start: event.target.selectionStart,
			     end: event.target.selectionEnd
			   });
    
  };

  
  const ReplySection = () => {
    return(
      <>
	{!replying
	 ? <button id={`reply-${props.thoughtId}`}
		   onClick={() => setReplying(true)}>
	     REPLY!
	   </button>
	 : <section className="replying">
	     Reply:
	     <textarea id="replyTextBox"
		       name="replyContent"
		       spellCheck="true"
		       placeholder="Reply with kindness"
		       onChange={handleChangeReply}
		       ref={replyAreaRef}
		       value={replyContent}>
	     </textarea>
	     <div className="actions">
	       <button id={`saveEdit-${props.thoughtId}`}
		       onClick={handleReplySubmit}> SAVE </button>
	     </div>
	   </section>}
      </>
    );
  };

  const MyInteractivity = () => {
    return(<>
	     <button id={`edit-${props.thoughtId}`}
		     onClick={() => setIsEditing(!isEditing)}>EDIT!
	     </button>
	     <ReplySection />
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
	     <ReplySection />
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
	{(props.page !== "Reply") ? (props.thoughtReplyOfId !== null ? `Reply to thought ID: ${props.thoughtReplyOfId}` : '') : ""}
	<br/>
	Thought: {props.thought}
	<div className="actions">
	  {(props.userId===userId)
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
		  onChange={handleChangeThought}
		  ref={thoughtAreaRef}>
	</textarea>
	<div className="actions">
	  <button id={`saveEdit-${props.thoughtId}`}
		  onClick={handleSave}> SAVE </button>
	</div>
      </section>
    );
  };

  const ThoughtsPage = () => {
    switch (props.page) {
      case "MainFeed":
      return(<>
	       <li className="userName">
		 UserName:
		 <Link to={`/user/${props.userId}`}>
		   {props.userName}
		 </Link>
	       </li>
	       <li className="pfp">This is a profile pic</li>
	       <li className="userId">User ID: {props.userId}</li>
	     </>
	    );
    case "UserProfile":
      return(<li> ME </li>);
    case "UserPage":
      return(<li>{props.userName}</li>);
    case "Reply":
      return(<li>{props.userName}</li>);
    default:
      return(<li> No User I know </li>);
    }


  }
  
  return (
    <section className="entry">
      <div className="headliner">
	<ul>
	  <li className="thoughtId">Thought ID:
	    <Link  to={`/thought/${props.thoughtId}`}>
	      {props.thoughtId}
	    </Link>
	  </li>
	  <ThoughtsPage />
	</ul>
      </div>
      {isEditing ? <RenderEdit /> : <RenderThought />}
    </section>
  );
};

export default ThoughtPost;
