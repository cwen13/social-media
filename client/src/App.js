import React, { useState, useEffect, useContext, createContext } from 'react';
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
import Search from "./pages/Search";
import UserPage from "./pages/UserPage";
import MyPage from "./pages/MyPage";
import ThoughtPage from "./pages/ThoughtPage";
import LikedThoughts from "./pages/LikedThoughts";
import EditProfile from "./pages/EditProfile";
import ReThoughts from "./pages/ReThoughts/";
import UserRelations from "./pages/UserRelations/";

import Following from "./components/UserLists/Following/";
import Blocked from "./components/UserLists/Blocked/";
import Friends from "./components/UserLists/Friends/";
import Navbar from "./components/Navbar/";
import NotFound from "./components/NotFound/";
import { UserContextProvider } from "./utils/UserContext";
import Auth from "./utils/auth";

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

  useEffect(() => {
    if (!Auth.loggedIn()) {
      localStorage.removeItem("user_id");
      localStorage.removeItem('id_token');
    };
  },[])
  
  return (
    <ApolloProvider client={client}>
      <Router>
	<UserContextProvider>
	  <section className="siteContainer">
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
		path="/user/MyPage"
		element={<MyPage />}
	      />

	      <Route
		path="/user/MyPage/EditProfile"
		element={<EditProfile />}
	      />

	      <Route
		path="/user/:userId"
		element={<UserPage />}
	      />

	      <Route
		path="/user/:userId/liked"
		element={<LikedThoughts />}
	      />

	      <Route
		path="/user/:userId/ReThoughts"
		element={<ReThoughts />}
	      />

	      <Route
		path="/thought/:postId/:postType"
		element={<ThoughtPage />}
	      />

	      <Route
		path="/search/*"
		element={<Search />}
	      />

	      <Route
		path="/UserRelations"
		element={<UserRelations />}
	      />

	      <Route 
		path='*' 
		element={<NotFound />}
	      />
            </Routes>
	  </section>
	</UserContextProvider>
      </Router>
    </ApolloProvider>    
  );
}

export default App;
