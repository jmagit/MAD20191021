import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demos, { Saluda } from './demos';
import FotoMuro from './muro';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { ErrorBoundary } from './ErrorBoundary';

/*class Cabecera(props) { 
  extends Component {
  constructor(props) {
    super(props)
  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}*/
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
          <ErrorBoundary>
            { this.state.seleccionado }
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
