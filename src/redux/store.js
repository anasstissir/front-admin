import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";
import apiMiddleware from '../api'
import {routeMiddleware} from '../router'

//const sagaMiddleware = createSagaMiddleware();

const middlewares = [apiMiddleware];

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares),  window.devToolsExtension ? window.devToolsExtension() : f => f)
    );

    // sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
