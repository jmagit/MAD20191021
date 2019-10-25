import React, { Component } from 'react'

export class ValidationMessage extends Component {
    render() {
        if (this.props.msg) {
            return <span className="errorMsg">{this.props.msg}</span>;
        }
        return null;
    }
}
