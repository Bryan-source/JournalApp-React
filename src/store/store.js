import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import thunk from 'redux-thunk';
import { notesReducer } from '../reducers/notesReducer';
/* 
Se crea un createStore el cual recibe las acciones para devolver un reducer.
combineReducers: Debido a que el createStore únicamente recibe un sólo reducer con el combineReducers hacemos que reciba más de uno. */

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);