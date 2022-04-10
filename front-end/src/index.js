import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';

import authReducer from './shared/store/reducers/auth-reducer';
import './index.css';
import App from './App';

const store= createStore(combineReducers({auth:authReducer}))
ReactDOM.render(<Provider store={store}>
    <App />
</Provider> , document.getElementById('root'));
