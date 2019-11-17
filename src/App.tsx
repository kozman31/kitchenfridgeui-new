import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './nav-bar/navbar';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar name='awesome' emote='!!!@!'></NavBar>
      <header className="App-header">
        
        <img src={logo}
          className="App-logo" alt="logo" />
        <p>
          Hello World! This is a test...
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
