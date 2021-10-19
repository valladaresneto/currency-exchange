import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import reducers from "./redux/reducers";

const store = createStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
