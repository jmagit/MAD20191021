import React, { Component } from 'react';
import { ValidationMessage, Esperando } from './comunes';
import axios from 'axios';

export class PersonaMnt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            medo: 'list',
            listado: [],
            elemento: {},
            loading: true
        }
        this.idOriginal = null;
        this.URL = process.env.REACT_APP_API_URL + 'personas';
    }

    list() {
        this.setState({ loading: true })
        axios.get(this.URL)
            .then(resp => this.setState({ modo: 'list', listado: resp.data, loading: false }))
            .catch(err => { console.error(`${err.response.status} - ${err.response.statusText}`); this.setState({ loading: false }) })
    }
    add() {
        this.setState({ modo: 'add', elemento: { id: '', nombre: '', apellidos: '', edad: '' } })
    }
    edit(key) {
        this.setState({ loading: true })
        this.idOriginal = key;
        axios.get(this.URL + '/' + key)
            .then(resp => this.setState({ modo: 'edit', elemento: resp.data, loading: false }))
            .catch(err => { console.error(`${err.response.status} - ${err.response.statusText}`); this.setState({ loading: false }) })
    }
    view(key) {
        this.setState({ loading: true })
        axios.get(this.URL + '/' + key)
            .then(resp => this.setState({ modo: 'view', elemento: resp.data, loading: false }))
            .catch(err => { console.error(`${err.response.status} - ${err.response.statusText}`); this.setState({ loading: false }) })
    }
    delete(key) {
        if (!window.confirm('¿Seguro?')) return;
        axios.delete(this.URL + '/' + key)
            .then(resp => this.list())
            .catch(err => { console.error(`${err.response.status} - ${err.response.statusText}`); this.setState({ loading: false }) })
    }
    cancel() {
        this.setState({ elemento: {} });
        this.idOriginal = null;
        this.list();
    }
    send(elemento) {
        switch (this.state.modo) {
            case 'add':
                axios.post(this.URL, elemento)
                    .then(resp => this.cancel())
                    .catch(err => { console.error(`${err.response.status} - ${err.response.statusText}: ${err.response.data}`); this.setState({ loading: false }) })
                break;
            case 'edit':
                axios.put(this.URL + '/' + this.idOriginal, elemento)
                    .then(resp => this.cancel())
                    .catch(err => { console.error(`${err.response.status} - ${err.response.statusText}`); this.setState({ loading: false }) })
                break;
            case 'view':
                this.cancel();
                break;
            default:
        }
    }
    componentDidMount() {
        this.list();
    }

    render() {
        if (this.state.loading)
            return <Esperando />
        let comp;
        switch (this.state.modo) {
            case 'add':
                comp = <PersonaForm elemento={this.state.elemento} onSend={this.send.bind(this)} onCancel={this.cancel.bind(this)} />
                break;
            case 'edit':
                comp = <PersonaForm elemento={this.state.elemento} isEdit onSend={this.send.bind(this)} onCancel={this.cancel.bind(this)} />
                break;
            case 'view':
                comp = <PersonaView elemento={this.state.elemento} onCancel={this.cancel.bind(this)} />
                break;
            default:
                comp = <PersonasList listado={this.state.listado} onAdd={this.add.bind(this)}
                    onEdit={this.edit.bind(this)} onView={this.view.bind(this)} onDelete={this.delete.bind(this)} />
        }

        return comp;
    }
}

function PersonasList(props) {
    return <table className="table table-hover">
        <thead>
            <tr>
                <th>Nombre</th>
                <th> <input type="button" value="Añadir" onClick={e => props.onAdd()} /></th>
            </tr>
        </thead>
        <tbody>
            {props.listado.map((item) =>
                <tr key={item.id}>
                    <td>{item.nombre} {item.apellidos}</td>
                    <td>
                        <input type="button" value="Ver" onClick={e => props.onView(item.id)} />
                        <input type="button" value="Editar" onClick={e => props.onEdit(item.id)} />
                        <input type="button" value="Borrar" onClick={e => props.onDelete(item.id)} />
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

function PersonaView(props) {
    return <div>
        <p>
            <b>Código:</b>
            {props.elemento.id}
            <br />
            <b>Nombre:</b>
            {props.elemento.nombre}
            <br />
            <b>Apellidos:</b>
            {props.elemento.apellidos}
            <br />
            <b>Edad:</b>
            {props.elemento.edad}
        </p>
        <p>
            <input type="button" value="Volver" onClick={props.onCancel} />
        </p>

    </div>
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
                    // switch (this.form[cntr].name) {
                    //     case 'nombre':
                    //         if (this.form[cntr].value !== this.form[cntr].value.toUpperCase()) {
                    //             errors[this.form[cntr].name] = 'Tiene que estar en mayusculas';
                    //             invalid = true;
                    //         }
                    //         break;
                    //     default:
                    // }
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
                        {this.props.isEdit ? <span>{this.state.elemento.id}</span> :
                            <React.Fragment>
                                <input type="number" value={this.state.elemento.id} name="id" onChange={this.handleChange} required />
                                <ValidationMessage msg={this.state.msgErr.id} />
                            </React.Fragment>
                        }
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
                        <input type="button" value="Enviar" disabled={this.state.invalid}
                            onClick={e => this.props.onSend(this.state.elemento)} />
                        <input type="button" value="Volver" onClick={this.props.onCancel} />
                    </p>
                </form>
            </div>
        );
    }
}

