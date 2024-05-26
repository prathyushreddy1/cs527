import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as LDClient from 'launchdarkly-js-client-sdk';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('blue'); // Default background color

  useEffect(() => {
    const context = {
      kind: 'user',
      key: '1234'
    };
    const ldClient = LDClient.initialize('6568e22cced7871008d22273', context);

    ldClient.on('ready', () => {
      const flagValue = ldClient.variation('background-color-change');
      console.log(flagValue);
      setBackgroundColor(flagValue ? 'white' : 'black');
    });

    return () => ldClient.close();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
      <header className="App-header" style={{ backgroundColor: backgroundColor }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
      </header>
    </div>
  );
}

export default App;
