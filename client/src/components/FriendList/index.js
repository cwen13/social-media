import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const FriendList = (props) => {

  console.log(props);
  
  return(
      <li className="friend">
	<Link to={`/user/${props.friendId}`}>
	   {props.friendName}
	</Link>
      </li>
  );
};

export default FriendList;
