// Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Signup(props) {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [name, setName] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  useEffect(()=> {
    setMessage("");
  }, [email, name, password])

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: Send the user sign up data to the server
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
        name,
        email,
        password
      },
      {
        'Content-Type': 'application/json'
      }
    ).then(response => {
      if (!response.ok) {
        console.log(response);
        setMessage(`${response.status}: ${response.statusText}`);
        return;
      }
      //if user signded up successfully
      response.json().then(result => {
        props.updateUser(result.token);
      })
    })
  }

  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}

