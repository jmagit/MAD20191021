import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Demos, { Saluda } from './demos';
import FotoMuro from './muro';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { ErrorBoundary } from './ErrorBoundary';
import { PersonaMnt } from './personas';

class Cabecera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = () => this.setState(prev => ({ isOpen: !prev.isOpen }));
  }
  render() {
    return <Navbar color="light" light expand="md">
      <NavbarBrand href="/"><img src={logo} className="App-logo" alt="logo" /></NavbarBrand>
      <NavbarToggler aria-controls="basic-navbar-nav" onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {this.props.menu.map((item, index) =>
            <NavItem key={index}>
              <NavLink className="nav-link" onClick={e=> this.props.onSelect(index)}>{item.texto}</NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>;
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.menu = [
      { texto: 'personas', componente: <PersonaMnt /> },
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
        <Cabecera menu={this.menu} onSelect={this.seleccionar} />
        {/* <header className="App-header">
          <p>{ this.menu.map((item, index) => <button key={index} onClick={e=>this.seleccionar(index)}>{item.texto}</button>)}</p>
        </header> */}
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
