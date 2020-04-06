import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './wrappers/Header'
import Content from './content/Content';

function App() {

  return (
    <Router>
      <div>
        <Header />
        <main>
          <Content />
        </main>
      </div>
    </Router>
  );
}

export default App;
