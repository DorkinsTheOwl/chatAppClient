import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers';
import App from './containers/app';
import '../style.scss';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
        collapsed: true
    });
    middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.app-container'));