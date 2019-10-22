import React from 'react';
import logo from './logo.svg';
import './App.css';


function Saluda(props) {
  return <h1>Hola mundo</h1>
}
function saludame(nom, max) {
  let rslt = '';
  for (let i = 0; i < max; i++) {
    rslt +=  `Hola ${nom}`;
  }
  return rslt;
}
function tabla() {
  let rslt = [];
  for(let i=1; i++ < 6;)
    rslt.push(<li key={i - 1}>{i}</li>) 
  return rslt;
}
function App() {
  let nombre = 'mundo';
  let saludar = `Hola ${nombre.toUpperCase()}`;
  let eti =
    <div>
      <h1>Hola mundo</h1>
      <h2>Que tal estas</h2>
    </div>;
  eti = <React.Fragment>{eti}<br /></React.Fragment> 
  let i = 10;
  let msg = 'Este es le mensaje';
  let miCss = 'error';
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
        {eti}
        <p className={miCss} title="texto" withd="3">{saludar}</p>
        <p>{i * 10}</p>
        <p>{saludame('tu', 10)}</p>
        {msg && <p>{msg}</p>}
        <ul>
          {/* {[1,2,3,4,5].map((item, index) => <li key={index}>{item}</li>)} */}
          {tabla()}
        </ul>
        <Saluda />
      </div>
    </div>
  );
}

export default App;
