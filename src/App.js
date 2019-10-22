import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let nombre = 'mundo';
  let saluda = `Hola ${nombre.toUpperCase()}`;

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
        <p>{saluda}</p>

      </div>
    </div>
  );
}

export default App;
