import React, { Component } from 'react';
import { ValidationMessage } from './comunes';

export class PersonaMnt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elemento: { id: 1, nombre: 'Pepito111111111111', apellidos: 'Grillo', edad: 99 } //props.elemento 
        }
    }
    render() {
        return (
            <PersonaForm elemento={this.state.elemento} />
        );
    }
}

class PersonaForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elemento: props.elemento, msgErr: {}, invalid: true
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const cmp = event.target.name;
        const valor = event.target.value;
        this.setState(prev => {
            prev.elemento[cmp] = valor;
            return { elemento: prev.elemento, ...this.validar() }
        });
    }

    validar() {
        let errors = {};
        let invalid = false;
        for (let cntr in this.form) {
            if (!isNaN(+cntr) && this.form[cntr].name)
                if (this.form[cntr].validity.valid) {
                    errors[cntr] = null;
                    switch (this.form[cntr].name) {
                        case 'nombre':
                            if (this.form[cntr].value !== this.form[cntr].value.toUpperCase()) {
                                errors[this.form[cntr].name] = 'Tiene que estar en mayusculas';
                                invalid = true;
                            }
                            break;
                        default:
                    }
                } else {
                    errors[this.form[cntr].name] = this.form[cntr].validationMessage;
                    invalid = true;
                }
        }
        return { msgErr: errors, invalid: invalid };

    }

    componentDidMount() {
        this.setState({ ...this.validar() })
    }

    render() {
        return (
            <div>
                <form ref={(f) => this.form = f}>
                    <p>
                        <b>Código:</b>
                        <input type="number" value={this.state.elemento.id} name="id" onChange={this.handleChange} required />
                        <ValidationMessage msg={this.state.msgErr.id} />
                        <br />
                        <b>Nombre:</b>
                        <input type="text" value={this.state.elemento.nombre} name="nombre" onChange={this.handleChange}
                            required minLength={2} maxLength={10} />
                        <ValidationMessage msg={this.state.msgErr.nombre} />
                        <br />
                        <b>Apellidos:</b>
                        <input type="text" value={this.state.elemento.apellidos} name="apellidos" onChange={this.handleChange}
                            minLength={2} maxLength={10} />
                        <ValidationMessage msg={this.state.msgErr.apellidos} />
                        <br />
                        <b>Edad:</b>
                        <input type="number" value={this.state.elemento.edad} name="edad" onChange={this.handleChange}
                            min={16} max={67} />
                        <ValidationMessage msg={this.state.msgErr.edad} />
                    </p>
                    <p>
                        <input type="button" value="Enviar" disabled={this.state.invalid} />
                        <input type="button" value="Volver" />
                    </p>
                </form>
                {JSON.stringify(this.state.elemento)}
            </div>
        );
    }
}

