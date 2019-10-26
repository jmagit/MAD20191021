import React, { Component } from 'react'

const Pantalla = props => (
    <tr>
        <th colSpan="4" className="Pantalla">
            {props.pantalla.replace(/\./g, ",")}
        </th>
    </tr>
);
const Resumen = props => (
    <tr>
        <th colSpan="4" className="Resumen" >
            {props.resumen.replace(/\./g, ",")}
        </th>
    </tr>
);
class BtnCalcular extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (this.props.onClick)
            this.props.onClick(this.props.texto);
    };
    render() {
        return (
            <td colSpan={this.props.colSpan ? this.props.colSpan : 1} >
                <button className={this.props.css} onClick={this.handleClick}>{this.props.texto}</button>
            </td>
        );
    }
}
export default class Calculadora extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pantalla: '0',
            resumen: ''
        };
        this.acumulado = 0;
        this.operador = '+';
        this.limpiar = true;

        this.inicia = this.inicia.bind(this);
        this.ponDijito = this.ponDijito.bind(this);
        this.ponComa = this.ponComa.bind(this);
        this.borrar = this.borrar.bind(this);
        this.cambiaSigno = this.cambiaSigno.bind(this);
        this.calcula = this.calcula.bind(this);
    }
    componentWillMount() {
        console.warn('Calculadora componentWillMount');
        if(this.props.init) {
            this.setState({ pantalla: this.props.init.toString() });
        }
    }
    componentWillReceiveProps(next_props) {
        console.warn('Calculadora componentWillReceiveProps');
        // eslint-disable-next-line eqeqeq
        if(this.props.init !== next_props.init && next_props.init != this.state.pantalla) {
            if(isNaN(+next_props.init))
                throw new Error("Not a number");
            this.limpiar = false;
            this.setState({ pantalla: next_props.init.toString() });
        }
    }
    // shouldComponentUpdate(next_props, next_state) {
    //     console.warn('Calculadora shouldComponentUpdate');
    //     return this.state.pantalla !== next_state.pantalla || 
    //         this.state.resumen !== next_state.resumen;
    // }

    render() {
        console.warn('Calculadora render');
        return (
            <table className="Calculadora">
                <thead>
                    {!this.state.resumen ? null : <Resumen resumen={this.state.resumen} />}
                    <Pantalla pantalla={this.state.pantalla} />
                </thead>
                <tbody>
                    <tr>
                        <BtnCalcular css="btnOperar" texto="CE" onClick={this.inicia} />
                        <BtnCalcular css="btnOperar" texto="Borrar" onClick={this.borrar} colSpan="2" />
                        <BtnCalcular css="btnOperar" texto="+" onClick={this.calcula} />
                    </tr>
                    <tr>
                        {[7, 8, 9].map(item => <BtnCalcular key={'btn' + item} css="btnDigito" texto={item} onClick={this.ponDijito} />)}
                        <BtnCalcular css="btnOperar" texto="-" onClick={this.calcula} />
                    </tr>
                    <tr>
                        {[4, 5, 6].map(item => <BtnCalcular key={'btn' + item} css="btnDigito" texto={item} onClick={this.ponDijito} />)}
                        <BtnCalcular css="btnOperar" texto="*" onClick={this.calcula} />
                    </tr>
                    <tr>
                        {[1, 2, 3].map(item => <BtnCalcular key={'btn' + item} css="btnDigito" texto={item} onClick={this.ponDijito} />)}
                        <BtnCalcular css="btnOperar" texto="/" onClick={this.calcula} />
                    </tr>
                    <tr>
                        <BtnCalcular css="btnDigito" texto="+/-" onClick={this.cambiaSigno} />
                        <BtnCalcular css="btnDigito" texto="0" onClick={this.ponDijito} />
                        <BtnCalcular css="btnDigito" texto="," onClick={this.ponComa} />
                        <BtnCalcular css="btnOperar" texto="=" onClick={this.calcula} />
                    </tr>
                </tbody>
            </table>
        );
    }
    inicia() {
        this.acumulado = 0;
        this.operador = '+';
        this.limpiar = true;
        this.setState({ pantalla: '0', resumen: '' });
    }

    ponDijito(value) {
        if (typeof (value) !== 'string') {
            value = value.toString();
        }
        if (value.length !== 1 || value < '0' || value > '9') {
            console.error('No es un valor numerico.');
            return;
        }
        if (this.limpiar || this.state.pantalla === '0') {
            this.setState({ pantalla: value });
            this.limpiar = false;
        } else {
            this.setState(prev => { return { pantalla: prev.pantalla + value }; });
        }
    }

    ponComa() {
        if (this.limpiar) {
            if (!isFinite(this.acumulado) || isNaN(this.acumulado)) { return; }
            this.setState({ pantalla: '0.' });
            this.limpiar = false;
        } else if (this.state.pantalla.indexOf('.') === -1) {
            this.setState(prev => { return { pantalla: prev.pantalla + '.' }; });
        }
    }

    borrar() {
        if (this.limpiar || this.state.pantalla.length === 1) {
            this.setState({ pantalla: '0' });
            this.limpiar = true;
        } else {
            this.setState(prev => { return { pantalla: prev.pantalla.substr(0, prev.pantalla.length - 1) }; });
        }
    }

    cambiaSigno() {
        this.setState(prev => ({ pantalla: (-prev.pantalla).toString() }));
        if (this.limpiar) {
            this.acumulado = -this.acumulado;
        }
    }

    calcula(value) {
        if ('+-*/='.indexOf(value) === -1) {
            console.error(`Operacion no soportada: ${value}`);
            return;
        }

        this.setState(prev => {
            const operando = parseFloat(prev.pantalla);
            switch (this.operador) {
                case '+':
                    this.acumulado += operando;
                    break;
                case '-':
                    this.acumulado -= operando;
                    break;
                case '*':
                    this.acumulado *= operando;
                    break;
                case '/':
                    this.acumulado /= operando;
                    break;
                case '=':
                default:
                    break;
            }
            // Con eval()
            // acumulado = eval (acumulado + this.operador + prev.pantalla);
            prev.resumen = value === '=' ? '' : (prev.resumen + prev.pantalla + value);
            prev.pantalla = this.acumulado.toString();
            this.operador = value;
            this.limpiar = true;
            if(this.props.onChange)
                this.props.onChange(this.acumulado);
            return { pantalla: prev.pantalla, resumen: prev.resumen };
        });
    }
}
