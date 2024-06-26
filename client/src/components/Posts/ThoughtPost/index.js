import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pluralize } from './../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client"
import Auth from "./../../../utils/auth";
import {
  REMOVE_THOUGHT,
  UPDATE_THOUGHT,
  ADD_LIKED,
  REPLY_TO_THOUGHT,
  REMOVE_LIKED,
  RETHOUGHT_THOUGHT
} from "./../../../utils/mutations";
import {
  QUERY_MY_LIKED,
  QUERY_THOUGHT,
  QUERY_ALL_THOUGHTS,
  QUERY_ALL_REPLY_IDS,
  QUERY_ALL_RETHOUGHT_IDS,
  QUERY_RETHOUGHT_ORIGINAL_THOUGHT,
  QUERY_REPLY_ORIGINAL_THOUGHT,
  QUERY_REPLYS,
  GET_MY_NOTIFICATIONS
} from "./../../../utils/queries";
import ReplyPost from "./../ReplyPost";
import ReThoughtPost from "./../ReThoughtPost";
import { useUserContext } from "./../../../utils/UserContext";

import "./../PostStyling/style.css";

const ThoughtPost = (props) => {

  const {
    postId,
    postType
  } = useParams();

  const userId = localStorage.getItem("user_id")
  
  const {
    loginUser,
    logoutUser,
    likedList,
    setLikedList,
    updateNotifs
  } = useUserContext();
  
  const replyAreaRef = useRef(null);
  const thoughtAreaRef = useRef(null);
  const reThoughtAreaRef = useRef(null);

  const [ canEditRemove, setCanEditRemove ] = useState(userId === props.userId);
  const [ cursorPositionReply, setCursorPositionReply ] = useState({ start:0, end: 0 });
  const [ cursorPositionReThought, setCursorPositionReThought ] = useState({ start:0, end: 0 });
  const [ cursorPositionThought, setCursorPositionThought ] = useState({ start:0, end: 0 }); 

  const [ isReplying, setIsReplying ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isReThought, setIsReThought] = useState(false);
  const [ isLiked, setIsLiked ] = useState(props.liked);

  const [ replyText, setReplyText ] = useState("");
  const [ reThoughtText, setReThoughtText ] = useState("");
  const [ thoughtText, setThoughtText ] = useState(props.thought);

  const [ likedThought, { error: likedError }] = useMutation(
    ADD_LIKED,
  );
  
  const [ removeLikedThought, { error: removeLikedError }] = useMutation(
    REMOVE_LIKED,
  );
  
  const [ updateThought, { error: updateError }] =  useMutation(
    UPDATE_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );

  const [ removeThought, { error: removeError }] = useMutation(
    REMOVE_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );

  
  const [ addReThought, { error: rethoughtError }] = useMutation(
    RETHOUGHT_THOUGHT,
    {
      refetchqueries: Auth.loggedIn()
	? [
	  [
	    GET_MY_NOTIFICATIONS,
	    "getMyNotifications"
	  ]
	]
	: []
    }
  );
  
  const [ replyToThought, { error: replyError }] = useMutation(
    REPLY_TO_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_REPLYS,
	"getThoughtReplys"	
      ]
    }    
  );
  
  // useEffect to make sure focus stays in text area
  // for text to be focus during typingin thought
  useEffect(() => {
    if(isEditing) {
      thoughtAreaRef.current.focus();
      thoughtAreaRef.current.selectionStart = cursorPositionThought.start;    
    }
  },[thoughtText]);

  // for text to be focus during typinginreTthought
  useEffect(() => {
    if(isReThought) {
      reThoughtAreaRef.current.focus();
      reThoughtAreaRef.current.selectionStart = cursorPositionReThought.start;    
    }
  },[reThoughtText]);

  // for text to be focus during typinging reply
  useEffect(() => {
    if(isReplying) {
      replyAreaRef.current.focus();
      replyAreaRef.current.selectionStart = cursorPositionReply.start;
    }
  },[replyText]);
  
  // updating the textareas
  const handleChangeReThought = (event) => {
    setReThoughtText(event.currentTarget.value);
    setCursorPositionReThought(
      {
	start: event.target.selectionStart,
	end: event.target.selectionEnd
      }
    );
  };
  
  const handleChangeReply = (event) => {
    setReplyText(event.target.value);
    setCursorPositionReply(
      {
	start: event.target.selectionStart,
	end: event.target.selectionEnd
      }
    );    
  };

  const handleChangeThought = (event) => {
    setThoughtText(event.currentTarget.value);
    setCursorPositionThought(
      {
	start: event.target.selectionStart,
	end: event.target.selectionEnd
      }
    );
  }; 

  //------------------------
  //-------RETHOUGHT-BUTTON-
  //------------------------  
  const handleReThought = async (event) => {
    event.preventDefault();
    try {
      const reply = await addReThought(
	{
	  variables:
	  {
	    originalThoughtId: props.thoughtId,
	    originalThoughtUserId: props.userId,
	    additionalThought: reThoughtText
	  }
	}
      );
      setReThoughtText("");
      setIsReThought(false);
      console.log("Trying to rethought");
      if(props.page !== "ThoughtPage") {
	props.updateFeed();
	updateNotifs();
      }; 
    } catch (e) {
      throw new Error("You did not re the thought!");
      console.log(e);
    }
  };

  const ReThoughtBtn = (props) => {    
    return (
      <>
	{!isReThought
	 ? <button id={`reThought-${props.thoughtId}`}
		   onClick={() => setIsReThought(!isReThought)}>
	     RETHOGUHT
	   </button>
	 : <section className="reThought">
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
  
  //-------------------
  //-------EDIT-BUTTON-
  //-------------------
  const handleSave = async (event) => {
    event.preventDefault();
    setIsEditing(false);
    try {
      const updateThoughtResponse = await updateThought(
	{
	  variables:
	  {
	    thoughtId: props.thoughtId,
	    content: thoughtText
	  }
	}
      );
      props.updateFeed();
    } catch (e) {
      console.log("Thought update was not commited to memory")
      console.log(e)
    }; 
  };

  const EditBtn = (props) => {
    return (
      <>
	{!isEditing
	 ? <button id={`edit-${props.thoughtId}`}
		   disabled={!canEditRemove}
		   onClick={() => setIsEditing(!isEditing)}>EDIT!
	   </button>
	 : <section className="thought">
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
	   </section>}
      </>
    );
  };
  
  //-------------------
  //-------LIKE-BUTTON-
  //-------------------
  const handleLiked  = async (event) => {
    event.preventDefault();

    try {
      if (!props.liked) {
	await likedThought(
	  {
	    variables:
	    {
	      thoughtId: props.thoughtId,
	      thoughtUserId: props.userId
	    }
	  }
	);
	setIsLiked(true);
	setLikedList(
	  [
	    ...likedList,
	    props.thoughtId
	  ]
	);
      } else {
	await removeLikedThought(
	  {
	    variables:
	    {
	      thoughtId: props.thoughtId
	    }
	  }
	);
	setIsLiked(false);
	setLikedList(
	  [
	    ...likedList.filter(entry => entry !== props.thoughtId)
	  ]
	);
      }
    } catch (e) {
      throw new Error("No thought thought liked");
      console.log(e);
    }
  };

  const LikeBtn = () => {
    return(
      <button id={`liked-${props.thoughtId}`}
	      className={props.liked
			 ? "liked-thought"
			 : "not-liked"}
	      onClick={handleLiked}>
	LIKE!
      </button>
    )
  };
  
  
  //---------------------
  //-------REMOVE-BUTTON-
  //---------------------
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

  const RemoveBtn = (props) => {    
    return(
      <button id={`remove-${props.thoughtId}`}
	      disabled={!canEditRemove}
	      onClick={handleRemove}>Remove!
      </button> 
    ); 
  };
  
  //--------------------
  //-------REPLY-BUTTON-
  //--------------------
  const handleReplySubmit = async () => {
    try {
      const reply = await replyToThought(
	{
	  variables:
	  {
	    content: replyText,
	    thoughtId: props.thoughtId,
	    thoughtUserId: props.userId,
	    type: "reply"
	  }
	}
      );
      setReplyText("");
      setIsReplying(false);
      if(props.page !== "ThoughtPage") {
	props.updateFeed();
	updateNotifs();
      }; 
    } catch (e) {
      throw new Error("You did not reply to the thought!");
      console.log(e);
    }
  };

  const ReplyBtn = (props) => {
    return(
      <>
	{!isReplying
	 ? <button id={`reply-${props.thoughtId}`}
		   onClick={() => setIsReplying(true)}>
	     REPLY!
	   </button>
	 : <section className="replying">
	     <textarea id="replyTextBox"
		       name="replyText"
		       spellCheck="true"
		       placeholder="Reply with kindness"
		       onChange={handleChangeReply}
		       ref={replyAreaRef}
		       value={replyText}>
	     </textarea>
	     <div className="actions">
	       <button id={`saveEdit-${props.thoughtId}`}
		       onClick={handleReplySubmit}> SAVE </button>
	     </div>
	   </section>}
      </>
    );
  };

  const SingleThoughtPost = () =>{
    return(
      <section className="thought">
	{props.thought}
      </section>
    );
  };

  const PostPicker = (type) => {
    switch (type) {
     case "thought":
       
       return <SingleThoughtPost/>;
       break;
     case "reply":

       if(props.page === "ThoughtPage"
	 && props.thoughtId !== postId) return <SingleThoughtPost/>;
       
       return <ReplyPost page={props.page}
			 replyId={props.thoughtId}
			 reply={props.thought}
			 replyUserId={props.userId}
			 replyUserName={props.userName}
			 liked={props.liked}
			 isReThought={props?.isReThought}
			 isReply={props?.isReply}
			 type={props.type}
	      />;
       break;
     case "rethought":

       return <ReThoughtPost page={props.page}
			     reThoughtId={props.thoughtId}
			     reThought={props.thought}
			     reThoughtUserId={props.userId}
			     reThoughtUserName={props.userName}
			     liked={props.liked}
			     isReThought={props?.isReThought}
			     isReply={props?.isReply}
			     type={props.type}
	      />;
       break;
     default:
       break;
    }
  }
  
  return(
    <div className={`post ${props.page === "ThoughtPage" && "reverse"}`}>
      <section className="authorInfo">
	<div>
	  <Link to={`/user/${props.userId}`}>
	    <span className="pfpCircle">
	      <img className="pfp" src={`/images/pfp/${props.profilePicture}`}/>
	    </span>
	    {props.userName} ({props.userId})
	    <br/>
	    {props.handle} 
	  </Link>
	  <Link to={`/thought/${props.thoughtId}/${props.type}`}>
	    Thought: {props.thoughtId}
	  </Link>
	</div>
      </section>
      {PostPicker(props.type)}
      <section className={`bottom-buttons ${props.page === "ThoughtPage" && "reverse"}`}>
	<LikeBtn />
	<ReThoughtBtn />
	<ReplyBtn />
	<EditBtn />
	<RemoveBtn />
      </section>
    </div>
  );
};

export default ThoughtPost;
