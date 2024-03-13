import React, { useState, useCallback, useContext } from "react";
import { useMutation } from "@apollo/client";

import {
  ADD_THOUGHT
} from "./../../utils/mutations";
import {
  QUERY_USER_THOUGHTS,
  QUERY_MY_THOUGHTS,
  QUERY_ALL_THOUGHTS,
  QUERY_USER_LIKED,
  QUERY_USER_RETHOUGHTS  
} from "./../../utils/queries";

import "./style.css";

const ThoughtCreate = ({ userId, page }) => {
  
  const [ thought, setThought ] = useState("");

    const queryOptions = {
    MyPage : QUERY_USER_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
    Liked: QUERY_USER_LIKED,
    UserReThoughts: QUERY_USER_RETHOUGHTS
  }

  const thoughts = {
    MyPage : "getUserThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
    Liked: "getUserLiked",
    UserReThoughts: "getUserReThoughts"
  };
  
  const [ newThought, { error } ] = useMutation(
    ADD_THOUGHT,{
      refetchQueries:
      [
	queryOptions[page],
	thoughts[page]
      ]
    }
  );
  
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    setThought(
      {
	...thought,
	thought: value,
      }
    );
  };
  
  const postThought = async (event) => {
    event.preventDefault();
    try {
      console.log("thought:", thought.thought);
      const mutationResponse = await newThought(
	{
	  variables: {
	    userId: userId,
	    content: thought.thought,
	  }
	}
      );
      setThought(
	{
	  ...thought,
	  thought: ""
	}
      );
      console.log("Thougth set to nothing");
      document.querySelector("#thoughtCreate").value="";
    } catch (e) {
      console.log("New thought was not commited to memory")
      console.log(e)
    };
  };
  
  return(
    <>
      <div className="thoughtInput">
	<label>Add your thought</label>
	<textarea placeholder="Put your thought into the database"
		  rows="4"
		  cols="33"
		  id="thoughtCreate"
		  onChange={handleChange}>
	</textarea>
	<button id="postThought" onClick={postThought}>
	  Thought creation
	</button>
      </div> 
    </>
  );
};

export default ThoughtCreate;

