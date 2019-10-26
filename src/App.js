import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Demos, { Saluda } from './demos';
import FotoMuro from './muro';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink as BNavLink } from 'reactstrap';
import { ErrorBoundary } from './ErrorBoundary';
import { PersonaMnt } from './personas';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import { PageNotFound } from './comunes';
import { ContadorStored } from './contadorStored';
import { Notificaciones } from './notificaciones';
import Calculadora from './calculadora';
import Blog from './blog';

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
              <NavLink className="nav-link" activeClassName="active" to={item.url}>{item.texto}</NavLink>
              {/* <BNavLink className="nav-link" activeClassName="active" href={item.url}>{item.texto}</BNavLink> */}
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
      { texto: 'inicio', url: '/home' },
      { texto: 'demos', url: '/demos' },
      { texto: 'muro', url: '/muro/de/fotos' },
      { texto: 'personas', url: '/personas' },
      { texto: 'cont', url: '/cont' },
      { texto: 'calc', url: '/calculadora' },
      { texto: 'blog', url: '/blog' },
    ];
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Cabecera menu={this.menu} onSelect={this.seleccionar} />
          <div className="container-fluid">
            <Notificaciones />
            <ErrorBoundary>
              <Switch>
                <Redirect from="/" to="/home" exact />
                <Route path='/home' render={() => <Saluda nombre="soy la página principal" />} exact />
                <Route path='/demos' render={() => <Demos nombre="Desde app" />} exact />
                <Route path='/cont' render={() => <ContadorStored />} exact />
                <Route path='/muro/de/fotos' component={FotoMuro} exact />
                <Route path='/calculadora' component={Calculadora} exact />
                <Route path='/blog' component={Blog} exact />
                <Route path='/personas' component={PersonaMnt}  exact />
                <Route path='/personas/add' component={PersonaMnt} exact  />
                <Route path='/personas/:id' component={PersonaMnt} exact />
                <Route path='/personas/:id/edit' component={PersonaMnt} exact />
                <Route path='/404.html' component={PageNotFound} exact />
                <Route component={PageNotFound} />
              </Switch>
            </ErrorBoundary>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
