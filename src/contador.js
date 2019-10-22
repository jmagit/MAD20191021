import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Contador extends Component {
    static propTypes = {
        init: PropTypes.number.isRequired,
        delta: PropTypes.any,
        onCambia: PropTypes.func
    };
    static defaultProps = {
        delta: 1
    }

    constructor(props) {
        super(props)
        this.state = {
            cont: this.props.init
        }
        this.baja = () => this.cambia(-1);
        //this.sube = this.sube.bind(this);
    }

    onCambia(valor) {
        if (this.props.onCambia) 
            this.props.onCambia(valor);
    }
    cambia(delta) {
        // this.state.cont += delta;
        // this.setState( { cont:  this.state.cont + delta});
        this.setState((prev, props) =>{ 
            let rslt = prev.cont + delta * props.delta
            this.onCambia(rslt);
            return { cont: rslt }
        });
    }
    init() {
        this.setState({ cont: this.props.init });
    }
    sube() {
        this.cambia(1);
    }
    render() {
        return (
            <div>
                <h1>{this.state.cont}</h1>
                <p>
                    <input type="button" value="-" onClick={this.baja} />
                    <input type="button" value="+" onClick={this.sube.bind(this)} />
                    <input type="button" value="Init" onClick={(e) => this.init()} />
                </p>
            </div>
        )
    }
}
