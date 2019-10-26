import React from 'react'
import { connect } from 'react-redux'
import { CounterUpAction, CounterDownAction } from './mi-store'
const contadorStored = ({ contador, onSube, onBaja }) => (
    <div>
      <h1>{contador}</h1>
      <p><button onClick={onSube}>Sube</button>&nbsp; <button onClick={onBaja}>Baja</button></p>
    </div>
)

export const ContadorStored = connect(
    (state, ownProps) => {
        return {
            contador: state.contador
        }
    },
    (dispatch, ownProps) => {
        return {
            onSube: () => { dispatch(CounterUpAction()) },
            onBaja: () => { dispatch(CounterDownAction()) },
        }
    }
)(contadorStored)
