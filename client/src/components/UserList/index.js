import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const UserList = (props) => {

  return(
    <li className={props.listOf}>
	<Link to={`/user/${props.userId}`}>
	   {props.userName}
	</Link>
      </li>
  );
};

export default UserList;
