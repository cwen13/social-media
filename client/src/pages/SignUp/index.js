import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from './../../utils/auth';
import { ADD_USER } from './../../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ userName: "",
					       handle: "",
					       firstName: "",
					       lastName: "",
					       email: "",
					       password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
	userName: formState.userName,
	handle: formState.handle,
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password
      },
    });
    console.log(mutationResponse);
    const token = mutationResponse.data.addUser.token;
    Auth.login(token, mutationResponse.data.addUser.user.id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const sendToLogin = (event) => {
    event.preventDefault();
    window.location.assign("/login");
  }

  
  return (
    <div className="" id="signUp">
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>

	<div className="attribute">
          <label htmlFor="userName">User Name:</label>
          <input
            placeholder="User name"
            name="userName"
            type="userName"
            id="userName"
            onChange={handleChange}
          />
        </div>

	<div className="attribute">
          <label htmlFor="handle">Handle:</label>
          <input
            placeholder="handle"
            name="handle"
            type="handle"
            id="handle"
            onChange={handleChange}
          />
        </div>

        <div className="attribute">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First name"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
	
        <div className="attribute">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last name"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>

	<div className="attribute">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>

	<div className="attribute">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>

	<div className="attribute">
          <button type="submit">Submit</button>
	  <button type="button" onClick={sendToLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
