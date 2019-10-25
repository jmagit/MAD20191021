import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demos, { Saluda } from './demos';
import FotoMuro from './muro';



class App extends Component {
  constructor(props) {
    super(props)
    this.menu = [
      { texto: 'inicio', componente: <Saluda nombre="soy la página principal" /> },
      { texto: 'demos', componente: <Demos nombre="Desde app" /> },
      { texto: 'muro', componente: <FotoMuro /> },
    ];
    this.state = {
      seleccionado: this.menu[0].componente
    }
    this.seleccionar = (indice) => this.setState({ seleccionado: this.menu[indice].componente });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{ this.menu.map((item, index) => <button key={index} onClick={e=>this.seleccionar(index)}>{item.texto}</button>)}</p>
        </header>
        <div className="container-fluid">
          { this.state.seleccionado }
        </div>
      </div>
    );
  }
}

export default App;
