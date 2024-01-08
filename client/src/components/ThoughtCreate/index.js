import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "./../../utils/mutations";
import { QUERY_ALL_THOUGHTS, QUERY_MY_THOUGHTS } from "./../../utils/queries";

import "./style.css";

const ThoughtCreate = ({ userId, page }) => {
  
  const refetchOptions = { MyPage : [ QUERY_MY_THOUGHTS, "getMyThoughts"],
			   MainFeed: [ QUERY_ALL_THOUGHTS, "getAllThoughts"] }
  
  const [ thought, setThought ] = useState("");
  const [ newThought, { error } ] = useMutation(ADD_THOUGHT,{
    refetchQueries: refetchOptions[page]
  });
  
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    setThought({
      ...thought,
      thought: value,
    });
  };

  const checkLength = (entry) => {
    if (entry.length < 249)
    {
      return entry
    } else {
      let redString = entry.splice(249);
      
      return `${entry.slice(0,249)} <span id="extraText">${redString}</span>`;
    }
  }
  
  
  const postThought = async (event) => {
    event.preventDefault();
    try {
      console.log("thought:", thought.thought);
      const mutationResponse = await newThought(
	{
	  variables:
	  {
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
      document.querySelector("#thoughtBox").value="";
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
		  id="thoughtBox"
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
