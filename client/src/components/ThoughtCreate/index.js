import React, { useState, useCallback, useContext } from "react";

import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "./../../utils/mutations";
import { QUERY_ALL_THOUGHTS } from "./../../utils/queries";

import "./style.css";

import { useUserContext } from "./../../utils/UserContext";

const ThoughtCreate = () => {

  const { userId, loginUser, logoutUser } = useUserContext();
  
  const [ thoughtState, setThoughtState ] = useState("");
  const [ newThought, { error } ] = useMutation(ADD_THOUGHT,{
    refetchQueries: [
      QUERY_ALL_THOUGHTS,
      "getAllThoughts"]
  });
  
  const handleChange = (event) => {
    console.log(event.currentTarget.value);
    const value = event.currentTarget.value;
    setThoughtState({
      ...thoughtState,
      thought: value,
    });
  };
  
  const postThought = async (event) => {
    event.preventDefault();
    try {
      console.log("thought:", thoughtState.thought);
      const mutationResponse = await newThought({
	variables: {
	  userId: userId,
	  content: thoughtState.thought,
	  thoughtReplyOfId: null
	}
      });
      setThoughtState({
	...thoughtState,
	thought: ""
      });
      document.querySelector("#thoughtBox").value="";
    } catch (e) {
      console.log("New thought was not commited to memory")
      console.log(e)
    };
  };
  
  return(
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
  );
};

export default ThoughtCreate;
