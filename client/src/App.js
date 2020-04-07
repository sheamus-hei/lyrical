import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './wrappers/Header'
import Content from './content/Content';

function App() {
  const [songInfo, setSongInfo] = useState({});
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Content songInfo={songInfo} setSongInfo={setSongInfo} />
        </main>
      </div>
    </Router>
  );
}

export default App;
