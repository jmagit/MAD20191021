import React, { Component } from 'react';

export class PersonaMnt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elemento: { id: 1, nombre: 'Pepito', apellidos: 'Grillo', edad: 99 } //props.elemento 
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
            return { elemento: prev.elemento }
        });
    }

    validar() {
        let errors = {};
        let invalid = false;
        for (let cntr in this.form) {
            if (!isNaN(+cntr) && this.form[cntr].name)
                if (this.form[cntr].validity.valid)
                    errors[cntr] = null;
                else {
                    errors[this.form[cntr].name] = this.form[cntr].validationMessage;
                    invalid = true;
                }
        }
        this.setState({ msgErr: errors, invalid: invalid })

    }
    render() {
        return (
            <div>
                <form ref={(f) => this.form = f}>
                    <p>
                        <b>Código:</b>
                        <input type="number" value={this.state.elemento.id} name="id" onChange={this.handleChange} />
                        <br />
                        <b>Nombre:</b>
                        <input type="text" value={this.state.elemento.nombre} name="nombre" onChange={this.handleChange} />
                        <br />
                        <b>Apellidos:</b>
                        <input type="text" value={this.state.elemento.apellidos} name="apellidos" onChange={this.handleChange} />
                        <br />
                        <b>Edad:</b>
                        <input type="number" value={this.state.elemento.edad} name="edad" onChange={this.handleChange} />
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

