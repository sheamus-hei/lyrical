import React, { useState, useEffect } from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

import Header from './wrappers/Header'
import Content from './content/Content';

function App() {
  const [songInfo, setSongInfo] = useState({});
  const [user, updateUser] = useState(null);
  const [token, setToken] = useState(null);

  // let [user, updateUser] = useState({
  //   id: 1,
  //   name: "Erik",
  //   email: "erik@test.com",
  //   password: "password"
  // })

  const setUserToken = (responseData) => {
    if (responseData) {
      console.log("token successfully obtained")
      setToken(responseData.token)
      updateUser(responseData.user)
    } else {
      setToken(null)
      updateUser(null)
    }
  }
  

  return (
    <Router>
      <div className="wrapper"> 
        <Header logout={() => setUserToken(null)} user={user} />
        <main>
          <Content songInfo={songInfo} setSongInfo={setSongInfo} 
            user={user} updateUser={updateUser} token={token} setUserToken={setUserToken} />
        </main>
        <footer>
          <p>© Erik (dj) Heikkila 2020</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
