import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Contador from './contador';
import { ErrorBoundary } from './ErrorBoundary';
import { ContadorStored } from './contadorStored';
import * as db from './mi-store';

export function Saluda(props) {
    console.log(`Componete saluda: ${props.nombre}`);
    return <h1>Hola {props.nombre ? (props.mayusculas ? props.nombre.toUpperCase() : props.nombre) : 'tu'}</h1>
}
function Despide({ nombre, mayusculas }) {
    return <h1>Adios {nombre ? (mayusculas ? nombre.toUpperCase() : nombre) : 'tu'}</h1>
}

export class Card extends Component {
    static propTypes = {
        titulo: PropTypes.string.isRequired,
        importancia: PropTypes.number,
    }
    static defaultProps = {
        importancia: 5
    }
    render() {
        return (
            <div>
                <h2>{this.props.titulo}</h2>
                <h3>Importancia: {this.props.importancia}</h3>
                {this.props.children[2]}
                <div>
                    <i>
                    {this.props.children}</i>
                </div>
            </div>
        );
    }
}

export default class Demos extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             valor: 1
        }

        this.onCambia = (valor) => this.setState({valor: valor});
        console.warn('Demos: constructor')
    }
    UNSAFE_componentWillMount() {
        console.warn('Demos: componentWillMount');
    }
    UNSAFE_componentWillReceiveProps(next_props) {
        console.warn('Demos: componentWillReceiveProps');
    }
    shouldComponentUpdate(next_props, next_state) {
        console.warn('Demos:shouldComponentUpdate ');
        return true;
    }
    UNSAFE_componentWillUpdate(next_props, next_state) {
        console.warn('Demos: componentWillUpdate');
    }
    
    render() {
        console.warn('Demos: render');
        let nom = 'Don Jose';
        let attr = { nombre: this.props.nombre, mayusculas: false }
        return (
            <div>
                <ContadorStored />
                <input type='button' value="UP" onClick={ e => db.CounterUpCmd()} />
                <input type='button' value="Notifica" onClick={ e => db.NotificationAddCmd('Esto es una notificacion.')} />
                <ErrorBoundary>
                    <Contador init={this.state.valor} delta={2} onCambia={this.onCambia } />
                </ErrorBoundary>
                {Saluda(attr)}
                <Saluda nombre={this.props.nombre} mayusculas />
                <Saluda nombre="Don Pepito" />
                <Saluda {...attr} />
                <Card titulo='El titulo' importancia={this.state.valor} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic consectetur ratione expedita, minus cumque quaerat velit natus officiis blanditiis veniam rerum fugiat placeat tempore. Aspernatur dolore itaque nisi delectus debitis?
                    <Despide nombre={nom} mayusculas />
                    <Despide nombre="Don Pepito" />

                </Card>
            </div>
        )
    }
    componentDidMount() {
        console.warn('Demos: componentDidMount');
        this.unsubscribe = db.store.subscribe(() => { this.setState({valor: db.store.getState().contador}); console.error('subscribe');} )
         
     }
     componentDidUpdate(next_props, next_state) {
         console.warn('Demos: componentDidUpdate');
     }
     componentWillUnmount() {
         this.unsubscribe();
         console.warn('Demos: componentWillUnmount');
     }
 }
