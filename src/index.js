import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from "./store/reducers/rootReducer";
import reduxThunk from 'redux-thunk'


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;


const enhancer = composeEnhancers(
    applyMiddleware(
        //for async
        reduxThunk
    ));

const store = createStore(rootReducer, enhancer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
