import React, { useState } from "react";

import { useUserContext } from "./../../utils/UserContext";
import UserInfo from "./../../components/UserInfo";
import Auth from "./../../utils/auth";
import "./../MainStyles/style.css";

function Search() {
    if(!Auth.loggedIn()) window.location.assign("/Mainfeed");
  const { userId, setUserId } = useUserContext;

  const [searchKey, setSearchKey ] = useState("");
  
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    setSearchKey({
      ...searchKey,
      searchKey: value,
    });
  };
  
  const searchSite = (searchKey) => {
    // searches to eb implemented
    // userId/userName/handle as @#:, @:, @.:
    // thought contains as contains:
    // hastags as #:
    // if not specifier searches thoughts and users
  };
  
  return (
    <>
      <p>SEARCH THE SITE</p>
      <section className="leftCol">
	<UserInfo id="userInfo" />
      </section>
      <section id="search"
	       className="rightCol">
	<form name="search">
	  <label for="searchKey">Search Key</label>
	  <input type="text"
		 name="searchKey"
		 id="searchKey"
		 required
		 onChange={handleChange}></input>
	  <button onClick={searchSite}
		  type="button">Search Social-Media</button>
	</form>
	<section id="searchResults">
	</section>
      </section>
    </>
  );
};



export default Search
