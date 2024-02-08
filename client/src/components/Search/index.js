import React from "react";
import { useUSerContext } from "./../../utils/USerContext";

const Search = (props) => {

  const {userId, loginUser, logoutUser} = useUserContext(); 
  console.log(userId);
  return (
    <p> the search area</p>
  );
};

export default Search;
