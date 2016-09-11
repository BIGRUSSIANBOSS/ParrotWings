/**
 * Created by sasha on 11.09.16.
 */

import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AccountLayout from '../components/AccountLayout';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger())
);

export default class Account extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <AccountLayout />
                </Provider>
            </div>
        );
    }
}