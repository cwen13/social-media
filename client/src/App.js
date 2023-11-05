import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import './App.css';

import MainFeed from "./pages/MainFeed";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar/";
import NotFound from "./components/NotFound/";
import Liked from "./components/Liked/";
import ReThought from "./components/ReThought/";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = ()=> {
  const { loading, error, data } = useQuery(QUERY_ME);

  let userMe;
  
  if ((typeof data === "undefined") || (data.me === null)) {
    userMe = { id: 0,
	       userName: "Luky",
	       firstName:"Lucky",
	       email:"licky@we.com" };
  } else {
    userMe = data.me;
  }
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  
  return (
    <ApolloProvider client={client}>
      <Router>
     	  <Navbar />
          <Routes>	    
            <Route 
              path="/" 
              element={<MainFeed userId={data.userId}
				 userName={data.userName}
				 firstName={data.firstName}
				 lastName={data.lastName}
				 email={data.email}
		       />} 
            />
	    <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<SignUp />} 
            />
	    <Route
	      path="/user/:userId"
	      element={<UserProfile userId={data.userId}
				    userName={data.userName}
				    firstName={data.firstName}
				    lastName={data.lastName}
				    email={data.email}
		       />}
	    />
	    <Route
	      path="/user/:userId/following"
	      element={<Following />}
	    />
	    <Route
	      path="/user/:userId/liked"
	      element={<Likes />}
	    />
	    <Route
	      path="/user/:userId/reThoughts"
	      element={<ReThoughts />}
	    />
	    <Route
	      path="/search/*"
	      element={<Search />}
	    />
	    <Route 
	      path='*' 
	      element={<NotFound />}
	    />
          </Routes>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
