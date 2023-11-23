import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const FriendList = ({ friendId, friendName, key }) => {
  
  
  return(
    <>
      <li>
	<Link to={`/user/${friendId}`}>
	  <p> {friendName}</p>
	</Link>
      </li>
    </>
  );
};

export default FriendList;
