import React, { useContext } from "react";

import UserContext from "./../App";

function Search() {
  const {userId, setUserId} = useContext(UserContext);
  
	
  return (
      <p>SEARCH</p>
  );
};



export default Search
