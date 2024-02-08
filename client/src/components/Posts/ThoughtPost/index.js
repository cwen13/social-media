import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client"
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
  QUERY_ALL_RETHOUGHT_IDS
} from "./../../../utils/queries";
import ReplyPost from "./../ReplyPost";
import ReThoughtPost from "./../ReThoughtPost";
import { useUserContext } from "./../../../utils/UserContext";

import "./../PostStyling/style.css";

const ThoughtPost = (props) => {

  let thoughtType = "";  
  if(props.isReThought) {
    thoughtType = "ReThought";
  } else if (props.isReply) {
    thoughtType = "Reply";
  } else {
    thoughtType = "Thought";
  }
  
  const {
    userId,
    loginUser,
    logoutUser,
    likedList,
    setLikedList
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
    {
      refetchQueries:
      [
	[
	  QUERY_ALL_THOUGHTS,
	  "getAllThoughts"
	],
	[
	  QUERY_MY_LIKED,
	  "getAllMyLiked"
	]
      ]
    }
  );
  const [ removeLikedThought, { error: removeLikedError }] = useMutation(
    REMOVE_LIKED,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
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

  const [ addReThought, { error: rethoughtError }] = useMutation(
    RETHOUGHT_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );

  const [ replyToThought, { error: replyError }] = useMutation(
    REPLY_TO_THOUGHT,
    {
      refetchQueries:
      [
	[
	  QUERY_ALL_THOUGHTS,
	  "getAllThoughts"
	],
	[
	  QUERY_ALL_REPLY_IDS,
	  "getAllReplyIds"
	],
	[
	  QUERY_THOUGHT,
	  "getThoughtReplys"
	]
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


  // Useeffect to make sure focus stays in text area
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
	    thoughtUserId: props.userId
	  }
	}
      );
      setReplyText("");
      setIsReplying(false);
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

  const PostPicker = () => {
    switch (thoughtType) {
    case "Thought":
      return <SingleThoughtPost/>;
      break;
    case "Reply":
      return <ReplyPost page={props.page}
			replyId={props.thoughtId}
			reply={props.thought}
			replyUserId={props.userId}
			replyUserName={props.userName}
			liked={props.liked}/>;
      break;
    case "ReThought":
      return <ReThoughtPost page={props.page}
			    reThoughtId={props.thoughtId}
			    reThought={props.thought}
			    reThoughtUserId={props.userId}
			    reThoughtUserName={props.userName}
			    liked={props.Liked}/>;
      break;
    default:
      break;
    }
  }
  
  
    return(
      <div className="post">
	<section className="authorInfo">
	  <p>
	    <Link to={`/user/${props.userId}`}>
	      <span className="pfpCircle">
		<img className="pfp" src={`/images/pfp/${props.profilePicture}`}/>
	      </span>
	      {props.userName} ({props.userId})
	      <br/>
	      {props.handle} 
	    </Link>
	    <Link to={`/thought/${props.thoughtId}/${thoughtType}`}>
	      Thought: {props.thoughtId}
	    </Link>
	  </p>
	</section>
	{PostPicker()}
	<section className="bottom-buttons">
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
