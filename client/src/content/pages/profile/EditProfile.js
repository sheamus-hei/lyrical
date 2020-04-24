// Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Signup(props) {
  // Declare and initialize state variables
  let [email, setEmail] = useState(props.user.email)
  let [name, setName] = useState(props.user.name)
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState(props.user.password)


  useEffect(()=> {
    setMessage("");
  }, [email, name, password])

  if (!props.user) {
      return <Redirect to='/' />
  }

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: Send the user sign up data to the server
    fetch(`https://lyrical-poetry.herokuapp.com/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
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

  return (
    <div className="simple center">
      <h2 className="fancy">Edit Profile</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" placeholder={props.user.name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" placeholder={props.user.email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" placeholder="enter a new password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  )
}

