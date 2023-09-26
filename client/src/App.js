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
import Signup from "./pages/Signup";
import UserFeed from "./pages/UserFeed";
import UserProfile from "./pages/UserProfile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar/";
import NotFound from ".//components/NotFound/";
import { QUERY_THOUGHTS } from "./utils/queries";

//debugging only
let QUERY_USERS = gql`  query getUsers {
user {
id
userName
firstName
lastName
}
  }
`;


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
  // this is casusing an invariant error
  const { loading, error, data } = useQuery(QUERY_USERS);
  const [ thoughts, setThoughts ] = useState(data);
  return (
    <ApolloProvider client={client}>
      <Router>
     	  <Navbar />
          <Routes>	    
            <Route 
              path="/" 
              element={<MainFeed thoughts={thoughts} />} 
            />
	    <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
	    <Route
	      path="/user/:userId"
	      element={<UserProfile />}
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
