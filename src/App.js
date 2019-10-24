import React from 'react';
import logo from './logo.svg';
import './App.css';
import Demos from './demos';
import FotoMuro from './muro';



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editar <code>src/App.js</code> y guardar para recargar en modo {process.env.REACT_APP_API_URL}.
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
      <div className="container-fluid">
        <FotoMuro />
        {/* <Demos nombre="Desde app" /> */}
      </div>
    </div>
  );
}

export default App;
