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

  let [user, setUser] = useState({ id: 0,
				   userName: "Luky",
				   firstName:"Lucky",
				   email:"licky@we.com" });
				 
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value=user>
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
	      element={<Following userId={data.userId}
				  userName={data.userName}
		       />}
	    />
	    <Route
	      path="/user/:userId/blocked"
	      element={<Blocked userId={data.userId}
				userName={data.userName}
		       />}
	    />
	    <Route
	      path="/user/:userId/liked"
	      element={<Liked userId={data.userId}
			      userName={data.userName}
		       />}
	    />
	    <Route
	      path="/user/:userId/reThoughts"
	      element={<ReThought userId={data.userId}
				  userName={data.userName}
		       />}
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
      </UserContext.Provider>
    </ApolloProvider>
    
  );
}

export default App;
