import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql
} from '@apollo/client';
 
import './App.css';
import { setContext } from "@apollo/client/link/context";
import { QUERY_ME } from "./utils/queries";

import MainFeed from "./pages/MainFeed";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import Search from "./pages/Search";

import Navbar from "./components/Navbar/";
import NotFound from "./components/NotFound/";
import Liked from "./components/Liked/";
import ReThought from "./components/ReThought/";
import Following from "./components/Following/";
import Blocked from "./components/Blocked/";

import { UserContextProvider } from "./utils/UserContext";

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


const App = () => {

  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
      <Router>
     	  <Navbar />
	  <Routes>	    
            <Route 
	      path="/" 
	      element={<MainFeed />} 
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
	      element={<UserProfile />}
	    />
	    <Route
	      path="/user/:userId/following"
	      element={<Following />}
	    />
	    <Route
	      path="/user/:userId/blocked"
	      element={<Blocked />}
	    />
	    <Route
	      path="/user/:userId/liked"
	      element={<Liked />}
	    />
	    <Route
	      path="/user/:userId/reThoughts"
	      element={<ReThought />}
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
      </UserContextProvider>
    </ApolloProvider>    
  );
}

export default App;
