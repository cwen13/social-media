import React, { useContext, useState, useEffect, useRef } from 'react';
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
  QUERY_THOUGHT
} from "./../../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../../utils/queries";
import ReplyPost from "./../ReplyPost";
import ReThoughtPost from "./../ReThoughtPost";
import { useUserContext } from "./../../../utils/UserContext";

import EditBtn from "./Buttons/Edit";
import LikeBtn from "./Buttons/Like";
import RmBtn from "./Buttons/Remove";
import ReplyBtn from "./Buttons/Reply";
import ReThoughtBtn from "./Buttons/ReThought";

import "./style.css";

const ThoughtPost = (props) => {

  const { userId, loginUser, logoutUser } = useUserContext();

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

  
  const RenderThought = () => {
    if(thoughtLoading) return "loading";
    return(
      <>
	<ThoughtType />
	<div className="actions">
	  {(props.userId===userId)
	   ? <MyInteractivity />
	   : <AllInteractivity />
	  }
	</div>
      </>
    );
  };

    const ThoughtType = () => {
    switch (thoughtType) {
    case "Thought":
      return <RenderThought />
      break;
    case "Reply":
      return <ReplyPost />
      break;
    case "ReTought":
      return <ReThoughtPost />
      break;
    default:
      break;
    } 
  };

  return (
    <section className="entry">
      <div className="headliner">
	<ul>
	  <li className="thoughtId">Thought ID:
	    <Link  to={`/thought/${props.thoughtId}`}>
	      {props.thoughtId}
	    </Link>
	  </li>
	</ul>
      </div>
      {isEditing ? <RenderEdit /> : <RenderThought />}
    </section>
  );
};

export default ThoughtPost;
