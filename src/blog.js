import React, { Component } from 'react'
import axios from 'axios';

import * as db from './mi-store'
import { Esperando, ValidationMessage } from './comunes';

export default class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modo: 'list',
            listado: [],
            elemento: {},
            loading: true,
        };
        this.idOriginal = null;
        this.URL = process.env.REACT_APP_API_URL + 'blog';
    }
    list() {
        this.setState({ loading: true });
        axios.get(this.URL).then(
            resp => this.setState({
                modo: 'list', listado: resp.data, loading: false
            }),
            err => {
                db.NotificationAddCmd(`${err.response.status} - ${err.response.statusText}`);
                this.setState({ loading: false });
            }
        );
    }
    add() {
        this.setState({ modo: 'add', elemento: { id: 0, texto: '', autor: '', fecha: '', megusta: 0, fotourl: '' } });
    }
    edit(key) {
        this.setState({ loading: true });
        axios.get(this.URL + '/' + key).then(
            resp => {
                this.setState({
                    modo: 'edit', elemento: resp.data, loading: false
                });
                this.idOriginal = key;
            }
            ,
            err => {
                db.NotificationAddCmd(`${err.response.status} - ${err.response.statusText}`);
                this.setState({ loading: false });
            }
        );
    }
    view(key) {
        this.setState({ loading: true });
        axios.get(this.URL + '/' + key).then(
            resp => this.setState({
                modo: 'view', elemento: resp.data, loading: false
            }),
            err => {
                db.NotificationAddCmd(`${err.response.status} - ${err.response.statusText}`);
                this.setState({ loading: false });
            }
        );
    }
    remove(key) {
        if (!window.confirm('¿Seguro?')) return;
        this.setState({ loading: true });
        axios.delete(this.URL + '/' + key).then(
            resp => this.list(),
            err => {
                db.NotificationAddCmd(`${err.response.status} - ${err.response.statusText}`);
                this.setState({ loading: false });
            }
        );
    }

    cancel() {
        this.setState({ elemento: {} });
        this.idOriginal = null;
        this.list();
    }
    send() {
        // eslint-disable-next-line default-case
        switch (this.state.modo) {
            case 'add':
                this.setState({ loading: true });
                axios.post(this.URL, this.state.elemento).then(
                    resp => this.cancel(),
                    err => {
                        db.NotificationAddCmd(`${err.response.status} - ${err.response.statusText}`);
                        this.setState({ loading: false });
                    }
                );
                break;
            case 'edit':
                this.setState({ loading: true });
                axios.put(this.URL + '/' + this.idOriginal, this.state.elemento).then(
                    resp => this.cancel(),
                    err => {
                        db.NotificationAddCmd(`${err.response.status} - ${err.response.statusText}`);
                        this.setState({ loading: false });
                    }
                );
                break;
            case 'view':
                this.cancel();
                break;
        }
    }
    render() {
        if (this.state.loading)
            return <Esperando />
        return (
            <div>
                {this.state.modo === 'list' && <BlogLst listado={this.state.listado}
                    onAdd={this.add.bind(this)} onView={this.view.bind(this)} />}
                {this.state.modo === 'view' && <BlogView elemento={this.state.elemento} onCancel={this.cancel.bind(this)} onEdit={this.edit.bind(this)} />}
                {this.state.modo === 'add' && <BlogForm elemento={this.state.elemento} onCancel={this.cancel.bind(this)}
                    onSend={this.send.bind(this)} isAdd={true} />}
                {this.state.modo === 'edit' && <BlogForm elemento={this.state.elemento} onCancel={this.cancel.bind(this)}
                    onSend={this.send.bind(this)} onDelete={this.remove.bind(this)} isAdd={false} />}
            </div>
        )
    }
    componentDidMount() {
        this.list();
    }

}
class BlogLst extends Component {
    striptags(value) { return value.replace(/<(?:.|\s)*?>/g, ''); }
    elipsis(value, maxlen) {
        return (!maxlen || !value || value.length < maxlen || value.length < 4) ?
            value : (value.substr(0, maxlen - 3) + '...');
    }
    render() {
        let ultimo = this.props.listado[this.props.listado.length - 1]
        return <div>
            <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{ultimo.titulo}</h1>
                    <p className="lead my-3">{this.elipsis(this.striptags(ultimo.texto), 100)}</p>
                    <p className="lead mb-0"><button type="button" onClick={e => this.props.onView(ultimo.id)} className="btn btn-link text-white font-weight-bold">Continuar leyendo...</button></p>
                </div>
            </div>
            <h1>Blog <button type="button" className="btn btn-link" onClick={this.props.onAdd}>Añadir</button></h1>
            <div className="row mb-2">
                {this.props.listado.map(item => <div key={item.id} className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                            <strong className="d-inline-block mb-2 text-primary">Angular</strong>
                            <h3 className="mb-0"><button type="button" onClick={e => this.props.onView(item.id)} className="btn btn-link font-weight-bold">{item.titulo}</button></h3>
                            <div className="mb-1 text-muted">{item.fecha}</div>
                            <p className="card-text mb-auto">{this.elipsis(this.striptags(item.texto), 100)}</p>
                            <button type="button" onClick={e => this.props.onView(item.id)} className="btn btn-link font-weight-bold">Leer mas</button>
                        </div>
                        {item.fotourl && <img className="card-img-right flex-auto d-none d-lg-block" src={item.fotourl} alt={`Imagen de ${item.titulo}`} />}
                    </div>
                </div>
                )}
            </div>
        </div>
            ;

    }
}

class BlogView extends Component {
    createMarkup() {
        return {__html: this.props.elemento.texto};
    }
    render() {
        return <div>
            {this.props.elemento.fotourl && <img src={this.props.elemento.fotourl} alt={`Imagen de ${this.props.elemento.titulo}`} />}
            <div className="blog-post">
                <h2 className="blog-post-title">{this.props.elemento.titulo}&nbsp;
                <button className="btn btn-link" type="button" onClick={e => this.props.onEdit(this.props.elemento.id)}>Editar</button>
                </h2>
                <p className="blog-post-meta">
                    {this.props.elemento.fecha} by {this.props.elemento.autor}
                </p>
                <hr />
                <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                <hr />
                <p className="blog-pagination text-right">
                    <button type="button" onClick={this.props.onCancel} className="btn btn-outline-info">Volver</button>
                </p>
            </div>
        </div>;
    }
}
class BlogForm extends Component {
    constructor(props) {
        super();
        this.state = { elemento: props.elemento, msgErr: {}, invalid: true };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const cmp = event.target.name;
        const valor = event.target.value;
        this.setState(prev => {
            prev.elemento[cmp] = valor;
            return { elemento: prev.elemento };
        });
        this.validar();
    }
    validar() {
        if (this.form) {
            const errors = {};
            let invalid = false;
            for (var cntr of this.form.elements) {
                if (cntr.name) {
                    errors[cntr.name] = cntr.validationMessage;
                    invalid = invalid || (errors[cntr.name] !== '' && errors[cntr.name] !== null && typeof (errors[cntr.name]) !== "undefined");
                }
            }
            this.setState({ msgErr: errors, invalid: invalid });
        }
    }
    componentDidMount() {
        this.validar();
    }
    render() {
        return <form ref={tag => { this.form = tag; }}>
            <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input type="text" className="form-control" id="titulo" name="titulo" value={this.state.elemento.titulo}
                    onChange={this.handleChange} required minLength="2" maxLength="200" />
                <ValidationMessage msg={this.state.msgErr.titulo} />
            </div>
            <div className="form-group">
                <label htmlFor="autor">Contenido</label>
                <textarea rows="6" className="form-control" id="texto" name="texto" value={this.state.elemento.texto}
                    onChange={this.handleChange} required maxLength="4000" />
                <ValidationMessage msg={this.state.msgErr.texto} />
            </div>
            <div className="form-group">
                <label htmlFor="autor">Autor</label>
                <input type="text" className="form-control" id="autor" name="autor" value={this.state.elemento.autor}
                    onChange={this.handleChange} required minLength="5" maxLength="50" />
                <ValidationMessage msg={this.state.msgErr.autor} />
            </div>
            <div className="form-group">
                <label htmlFor="fotourl">Foto</label>
                <input type="url" className="form-control" id="fotourl" name="fotourl" value={this.state.elemento.fotourl}
                    onChange={this.handleChange} maxLength="250" />
                <ValidationMessage msg={this.state.msgErr.fotourl} />
            </div>
            <div className="form-group">
                <label htmlFor="edad">Fecha</label>
                <input type="date" className="form-control" id="fecha" name="fecha" value={this.state.elemento.fecha}
                    onChange={this.handleChange} />
                <ValidationMessage msg={this.state.msgErr.fecha} />
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-outline-success" onClick={this.props.onSend}
                    disabled={this.state.invalid}>Enviar</button>
                {!this.props.isAdd && <button type="button" className="btn btn-outline-danger" onClick={e => this.props.onDelete(this.state.elemento.id)}>Eliminar</button>}
                <button type="button" className="btn btn-outline-primary" onClick={this.props.onCancel}>Volver</button>
            </div>
        </form>
    }
}
