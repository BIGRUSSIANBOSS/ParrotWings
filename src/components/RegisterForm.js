/**
 * Created by sasha on 04.09.16.
 */
import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import * as LoginActions from '../actions/LoginActions';

import * as reducers from '../reducers';

import Header from '../components/Header';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger())
);

@connect(state => ({
    LoginReducer: state.LoginReducer
}))
export default class RegisterForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            user: '',
            password: '',
            password2: ''
        };
    }

    handleChangeEmail (e) {
        this.setState({ email: e.target.value });
    }
    handleChangeLogin (e) {
        this.setState({ user: e.target.value });
    }

    handleChangePassword (e) {
        this.setState({ password: e.target.value });
    }
    handleChangePassword2 (e) {
        this.setState({ password2: e.target.value });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const actions = bindActionCreators(LoginActions, dispatch);
        if(this.state.password == this.state.password2){
            dispatch(actions.registerUser({
                user: this.state.user,
                email: this.state.email,
                password: this.state.password,
                dispatch: dispatch
            }));
        }

    }

    componentDidMount(){
        const { accounts, dispatch } = this.props;
        const actions = bindActionCreators(LoginActions, dispatch);
        dispatch(actions.checkUser());
    }

    render() {
        return (
            <div>

                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-md-offset-4">
                                <h1 className="text-center login-title">Parrot Wings</h1>
                                <div className="account-wall">
                                    <form className="form-signin">
                                        <input type="text" className="form-control b-b-l-r-0 b-b-r-r-0" placeholder="Введите Email"
                                               onChange={this.handleChangeEmail.bind(this)}
                                               value={this.state.email}
                                        />
                                        <input type="text" className="form-control b-r-0" placeholder="Введите логин"
                                               onChange={this.handleChangeLogin.bind(this)}
                                               value={this.state.login}
                                        />
                                        <input type="password" className="form-control b-r-0" placeholder="Введите пароль"
                                               onChange={this.handleChangePassword.bind(this)}
                                               value={this.state.password}
                                        />
                                        <input type="password" className="form-control b-t-r-r-0 b-t-l-r-0" placeholder="Введите пароль еще раз"
                                               onChange={this.handleChangePassword2.bind(this)}
                                               value={this.state.password2}
                                        />
                                        <button className="btn btn-lg btn-primary btn-block m-t-10" type="submit"
                                                onClick={this.handleSubmit.bind(this)}>Зарегистрировать и войти</button>
                                        <span className="clearfix"></span>
                                    </form>
                                </div>
                                <a href="/login" className="text-center new-account">Страница входа </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}