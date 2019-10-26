import { combineReducers, createStore } from 'redux'
import { StringDecoder } from 'string_decoder';


const INIT_STORE = 'INIT_STORE';
export const InitStoreAction = () => ({ type: INIT_STORE });

// Contador ---------------------------------------------
const COUNTER_UP = 'COUNTER_UP';
const COUNTER_DOWN = 'COUNTER_DOWN';

function contadorReducer(state = 0, action) {
    switch (action.type) {
        case COUNTER_UP:
            return state + 1;
        case COUNTER_DOWN:
            return state - 1;
        case INIT_STORE:
            return 0;
        default:
            return state;
    }
}

export const CounterUpAction = () => ({ type: COUNTER_UP });
export const CounterDownAction = () => ({ type: COUNTER_DOWN });

// Notificaciones
const NOTIFICATION_ADD = 'NOTIFICATION_ADD';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';
const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';

function notificationReducer(state = { listado: [], hayNotificaciones: false }, action) {
    switch (action.type) {
        case NOTIFICATION_ADD:
            return Object.assign({}, state, { listado: [...state.listado, action.mensaje], hayNotificaciones: true });
        case NOTIFICATION_REMOVE:
            return Object.assign({}, state, {
                listado: state.listado.filter((item, index) => index !== action.index),
                hayNotificaciones: state.listado.length > 1
            }
            );
        case NOTIFICATION_CLEAR:
        case INIT_STORE:
            return Object.assign({}, state, { listado: [], hayNotificaciones: false }
            );
        default:
            return state
    }
}

export const NotificationAddAction = msg => ({ type: NOTIFICATION_ADD, mensaje: msg})
export const NotificationRemoveAction = index => ({ type: NOTIFICATION_REMOVE, index})
export const NotificationClearAction = () => ({ type: NOTIFICATION_CLEAR })

// Reunir

const globalReducer = combineReducers({
    contador: contadorReducer,
    notification: notificationReducer,
    // ...
})

export const store = createStore(globalReducer)

export const InitStoreCmd  = () => store.dispatch(InitStoreAction());

export const CounterUpCmd  = () => store.dispatch(CounterUpAction());
export const CounterDownCmd  = () => store.dispatch(CounterDownAction());

export const NotificationAddCmd  = msg => store.dispatch(NotificationAddAction(msg));
export const NotificationRemoveCmd  = index => store.dispatch(NotificationRemoveAction(index));
export const NotificationClearCmd  = () => store.dispatch(NotificationClearAction());

store.CounterUp = () => store.dispatch(CounterUpAction());
