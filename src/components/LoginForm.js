
import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Notification } from 'react-notification';

import * as LoginActions from '../actions/LoginActions';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger())
);


@connect(state => ({
    LoginReducer: state.LoginReducer
}))
export default class LoginForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChangeEmail (e) {
        this.setState({ email: e.target.value });
    }

    handleChangePassword (e) {
        this.setState({ password: e.target.value });

    }

    handleSubmit (e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const actions = bindActionCreators(LoginActions, dispatch);
        dispatch(actions.logIn({
            user: this.state.email,
            password: this.state.password,
            dispatch
        }));
    }

    componentDidMount(){
        const { dispatch } = this.props;
        const actions = bindActionCreators(LoginActions, dispatch);
        dispatch(actions.checkUser()); // проверка не вошел ли я
    }

    notificationHide(){
        const { dispatch } = this.props;
        const actions = bindActionCreators(LoginActions, dispatch);
        dispatch(actions.hideNotification({
            message: this.props.LoginReducer.noty.message,
            isActive: this.props.LoginReducer.noty.isActive,
            dispatch
        }));
    }

    render() {
        return (
            <div>
                <div
                    onClick={this.notificationHide.bind(this)}>
                    <Notification
                        isActive={this.props.LoginReducer.noty.isActive}
                        message={this.props.LoginReducer.noty.message}
                    />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4">
                            <h1 className="text-center login-title">Parrot Wings</h1>
                            <div className="account-wall">
                                <form className="form-signin">
                                    <input type="text" className="form-control b-b-l-r-0 b-b-r-r-0" placeholder="Email"
                                           onChange={this.handleChangeEmail.bind(this)}
                                           value={this.state.email}
                                    />
                                    <input type="password" className="form-control b-t-l-r-0 b-t-r-r-0" placeholder="Password"
                                           onChange={this.handleChangePassword.bind(this)}
                                           value={this.state.password}
                                    />
                                    <button className="btn btn-lg btn-primary btn-block m-t-10" type="submit"
                                            onClick={this.handleSubmit.bind(this)}>Войти</button>
                                    <span className="clearfix"></span>
                                </form>
                            </div>
                            <a href="/register" className="text-center new-account">Создать аккаунт </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}