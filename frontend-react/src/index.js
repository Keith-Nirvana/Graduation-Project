/**
 * use React & React-DOM as the View scheme
 * use router for jump between pages
 * use Ant Design as the UI lib
 * user axios for http request
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


axios.defaults.baseURL = 'http://127.0.0.1:5000';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
