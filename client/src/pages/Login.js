import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_USER } from './../utils/mutations';
import Auth from './../utils/auth';
import { UserContext, useUserContext, UserContextProvider } from "./../utils/UserContext";


const Login = (props) => {

  const {userId, loginUser, logoutUser} = useUserContext();

  const [loginRes, setLoginRes] = useState(null);
  const [formState, setFormState] = useState({ email: '', password: '' });
  
  const [login, { error }] = useMutation(LOGIN_USER);
  
  useEffect( () => {
    if (loginRes) {
      console.log("CURRENT USER:", loginRes.data.login.user.id);
      loginUser(loginRes.data.login.user.id);
      Auth.login(loginRes.data.login.token);
    };
  }, [loginRes]);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({
        variables: { email: formState.email, password: formState.password },
      })
      setLoginRes(response);
      
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
