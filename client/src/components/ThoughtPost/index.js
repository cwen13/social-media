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
  REMOVE_LIKED,
  RETHOUGHT_THOUGHT
} from "./../../utils/mutations";
import {
  QUERY_MY_LIKED,
  QUERY_THOUGHT
} from "./../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

import { useUserContext } from "./../../utils/UserContext";

const ThoughtPost = (props) => {
  
  const thoughtAreaRef = useRef(null);
  const replyAreaRef = useRef(null);
  const reThoughtAreaRef = useRef(null);
  const { userId, loginUser, logoutUser } = useUserContext();

  const [ isEditing, setIsEditing ] = useState(false);
  const [ thoughtText, setThoughtText ] = useState(props.thought);
  const [ cursorPositionThought, setCursorPositionThought ] = useState({ start:0, end: 0 });
  const [ cursorPositionReply, setCursorPositionReply ] = useState({ start:0, end: 0 });
  const [ cursorPositionReThought, setCursorPositionReThought ] = useState({ start:0, end: 0 });
  const [ isLiked, setIsLiked ] = useState(props.liked);
  const [ replying, setReplying ] = useState(false);
  const [ replyContent, setReplyContent ] = useState("");
  const [ reThought, setReThought] = useState(false);
  const [ reThoughtText, setReThoughtText ] = useState("");
  
  const [ removeThought, { error: removeError }] = useMutation(
    REMOVE_THOUGHT,
    { refetchQueries:
      [ QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]});
  const [ updateThought, { error: updateError }] =  useMutation(
    UPDATE_THOUGHT,
    { refetchQueries:
      [ QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]});
  const [ likedThought, { error: likedError }] = useMutation(
    ADD_LIKED,
    { refetchQueries:
      [ QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]});
  const [ removeLikedThought, { error: removeLikedError }] = useMutation(
    REMOVE_LIKED,
    { refetchQueries:
      [ QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]});
  const [ replyToThought, { error: replyError }] = useMutation(
    REPLY_TO_THOUGHT,
    { refetchQueries:
      [ QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]});
  const [ addReThought, { error: rethoughtError }] = useMutation(
    RETHOUGHT_THOUGHT,
    { refetchQueries:
      [ QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]});
  const { loading: thoughtLoading, error: thoughtError, data: reThoughtOf } = useQuery(
    QUERY_THOUGHT,
    {
      variables:
      {
	thoughtId: props.thoughtReplyOfId
      }
    }
  );
  
  // for text to be focus during typingin thought
  useEffect(() => {
    if(isEditing) {
      thoughtAreaRef.current.focus();
      thoughtAreaRef.current.selectionStart = cursorPositionThought.start;    
    }
  },[thoughtText]);

  // for text to be focus during typinging reply
  useEffect(() => {
    if(replying) {
      replyAreaRef.current.focus();
      replyAreaRef.current.selectionStart = cursorPositionReply.start;
    }
  },[replyContent]);
  
    // for text to be focus during typinginreTthought
  useEffect(() => {
    if(reThought) {
      reThoughtAreaRef.current.focus();
      reThoughtAreaRef.current.selectionStart = cursorPositionReThought.start;    
    }
  },[reThoughtText]);

  if(thoughtLoading) return "loading";
  
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
      if (userId && !isLiked) {
	const likedResponse = await likedThought({
	  variables: {
	    thoughtId: props.thoughtId
	  }
	});
	setIsLiked(true);
      } else if (userId && isLiked) {
	const removeLikedResponse = await removeLikedThought({
	  variables: {
	    thoughtId: props.thoughtId
	  }
	});
	setIsLiked(false);
      } else {
	console.log("User needs to be logged in");
      };
    } catch (e) {
      throw new Error("No thought thought liked");
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

  const handleChangeThought = (event) => {
    setThoughtText(event.currentTarget.value);
    setCursorPositionThought({ start: event.target.selectionStart,
			       end: event.target.selectionEnd
			     });
    
  };

  const handleChangeReply = (event) => {
    setReplyContent(event.target.value);
    setCursorPositionReply({ start: event.target.selectionStart,
			     end: event.target.selectionEnd
			   });    
  };

  const handleChangeReThought = (event) => {
    setReThoughtText(event.currentTarget.value);
    setCursorPositionReThought({ start: event.target.selectionStart,
				 end: event.target.selectionEnd
			       });
  };

  const handleReThought = async (event) => {
    event.preventDefault();
    try {
      console.log("about to add reThought");
      console.log("thoughtid:", props.thoughtId);
      console.log("rethought:", reThoughtText);
      const reply = await addReThought({
	variables: {
	  originalThoughtId: props.thoughtId,
	  additionalThought: reThoughtText
	}});
      console.log("re'ed the thought");
      setReThoughtText("");
      setReThought(false);
    } catch (e) {
      throw new Error("You did not re the thought!");
      console.log(e);
    }
    
  }
  
  const ReThoughtButtonSection = (event) => {
    return (
      <>
	{!reThought
	 ? <button id={`reThought-${props.thoughtId}`}
		   onClick={() => setReThought(true)}>
	     RETHOGUHT
	   </button>
	 : <section className="reThought">
	     Thought:
	     <textarea id="reThoughtTextBox"
		       name="reThoughtText"
		       spellCheck="true"
		       placeholder="Additional thoughts?"
		       onChange={handleChangeReThought}
		       ref={reThoughtAreaRef}
		       value={reThoughtText}>
	     </textarea>
	     <div className="actions">
	       <button id={`saveReThought-${props.thoughtId}`}
		     onClick={handleReThought}> SAVE </button>
	     </div>
	   </section>
	}
      </>	       
    );
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
	     <ReThoughtButtonSection />
	   </>
	  );
  };

  const ReThoughted = () => {
    return(
      <div className="originalThought">
	 {reThoughtOf.getThought.content}
      </div>  
    );
  };
  
  const RenderThought = () => {
    if ((props.isReThought) && (reThoughtOf.getThought !== null)) {
      return(
	<section className="thought">
	  <div className="currentThought">
	       {props.thought}
	  </div>
	  <ReThoughted />
	  <div className="actions">
	    {(props.userId===userId)
	     ? <MyInteractivity />
	     : <AllInteractivity />
	    }
	  </div>
      </section>
      );
    };
    
    return (
      <section className="thought">
	{(props.page !== "Reply") ? (props.thoughtReplyOfId !== null ? `Reply to thought ID: ${props.thoughtReplyOfId}` : '') : ""}
	<br/>
	<div className="currentThought">
	  Thought: {props.thought}
	</div>
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
    case "UserPage":
    case "Reply":
    case "Liked":
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
