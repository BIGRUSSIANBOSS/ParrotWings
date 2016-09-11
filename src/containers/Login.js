/**
 * Created by sasha on 11.09.16.
 */

import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import LoginForm from '../components/LoginForm';


import * as LoginActions from '../actions/LoginActions';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger())
);

export default class Login extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </div>
        );
    }
}