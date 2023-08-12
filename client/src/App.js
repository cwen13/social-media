import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import {
} from "./componets/";


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
	  <Navbar
	  />
          <Routes>
	    
            <Route 
              path="/" 
              element={<MainFeed/>} 
            />
	    <Route 
              path="/login" 
              element={<Login/>} 
            />
            <Route 
              path="/signup" 
              element={<SignUp/>} 
            />
            <Route 
              path="/user/self" 
              element={<UserFeed/>} 
            />
	    <Route
	      path="/user/:userId"
	      element={<UserProfile/>}
	    />
	    <Route
	      path="/search/*"
	      element={<Search/>}
	    />
	    <Route 
	      path='*' 
	      element={<h1 className="display-2">Wrong page!</h1>}
	    />
	    
          </Routes>
        </>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
