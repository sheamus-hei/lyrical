import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

import Header from './wrappers/Header'
import Content from './content/Content';

function App() {
  const [songInfo, setSongInfo] = useState({});
  let [user, updateUser] = useState({
    name: "Erik",
    email: "erik@test.com",
    password: "password"
  })
  //let [user, updateUser] = useState(null)

  // useEffect(() => {
  //   decodeToken();
  // }, []);

  // const updateUser = newToken => {
  //   if (newToken) {
  //     localStorage.setItem('mernToken', newToken);
  //     decodeToken(newToken);
  //   } else {
  //     setUser(null);
  //   }
  // }

  // const decodeToken = existingToken => {
  //   let token = existingToken || localStorage.getItem('mernToken');
  //   if (token) {
  //     let decoded = jwtDecode(token);
  //     if (!decoded || Date.now() >= decoded.exp * 1000) {
  //       console.log("Token expired!");
  //       setUser(null);
  //     } else {
  //       setUser(decoded);
  //     }
  //   } else {
  //     setUser(null);
  //   }
  // }

  return (
    <Router>
      <div>
        <Header user={user} />
        <main>
          <Content songInfo={songInfo} setSongInfo={setSongInfo} 
            user={user} updateUser={updateUser} />
        </main>
      </div>
    </Router>
  );
}

export default App;
