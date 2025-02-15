import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/index';

import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import configureStore, {history} from "./store/index";
import {Provider} from "react-redux";

export const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
        <Switch>
            <Route path="/" component={App}/>
        </Switch>
    </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
