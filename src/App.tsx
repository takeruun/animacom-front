import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const App: FC = () => {
  const [isState, toggleState] = useState<boolean>(false);
  const change = () => {
    axios.get('http://localhost:3001/health');
    toggleState(false);
  };

  useEffect(() => {
    document.getElementById('change')?.addEventListener('click', change);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React www
        </a>
        <button id="change" type="button">
          api :
          {isState}
        </button>
      </header>
    </div>
  );
};

export default App;
