/**
 * Created by sasha on 11.09.16.
 */

import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Notification } from 'react-notification';

import Transaction from './Transaction';

import Header from './Header';
import User from './User';

import * as AccountActions from '../actions/AccountActions';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger())
);

@connect(state => ({
    AccountReducer: state.AccountReducer
}))
export default class LoginForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userFilter: ''
        };
    }

    handleFilterChange(e){
        this.setState({
            userFilter: e.target.value
        });
        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.filterUsers({
            filterUser: e.target.value
        }));
    }

    handleSubmit (e) {
        e.preventDefault();
    }

    logOut(e){
        e.preventDefault();
        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.logOut(dispatch));
    }

    componentDidMount(){
        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.checkUser()); // проверка не вошел ли я
        dispatch(actions.updateData(dispatch)); // берем данные
    }

    showTransactions(){
        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.showTransactions()); // проверка не вошел ли я
    }

    showAccounts(){
        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.showAccounts()); // проверка не вошел ли я

    }

    notificationHide(){
        const { dispatch } = this.props;
        const actions = bindActionCreators(LoginActions, dispatch);
        dispatch(actions.hideNotification({
            message: this.props.AccountReducer.noty.message,
            isActive: this.props.AccountReducer.noty.isActive,
            dispatch
        }));
    }

    render() {

        console.log(this.props.AccountReducer.view);

        var VIEW = "accounts";

        switch(this.props.AccountReducer.view){
            case "accounts":
                VIEW = "transactions";
                break;
            case "transactions":
                VIEW = "accounts";
                break;

        }

        return (
            <div className="m-t-50">

                <div
                    onClick={this.notificationHide.bind(this)}>
                    <Notification
                        isActive={this.props.AccountReducer.noty.isActive}
                        message={this.props.AccountReducer.noty.message}
                    />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">


                            <div className="profile-sidebar">
                                <div className="profile-userpic">
                                    <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" className="img-responsive" alt="" />
                                </div>
                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        {this.props.AccountReducer.user}
                                    </div>
                                    <div className="profile-usertitle-job">
                                        {this.props.AccountReducer.pwPoints} PW
                                    </div>
                                </div>
                                <div className="profile-usermenu">
                                    <ul className="nav">
                                        <li className="active">
                                            <a href="#" onClick={this.showTransactions.bind(this)}>
                                                <i className="glyphicon glyphicon-usd"></i>
                                                Транзакции </a>
                                        </li>
                                        <li className="active">
                                            <a href="#" onClick={this.showAccounts.bind(this)}>
                                                <i className="glyphicon glyphicon-user"></i>
                                                Пользователи </a>
                                        </li>
                                        <li className="active">
                                            <a href="#" onClick={this.logOut.bind(this)}>
                                                <i className="glyphicon glyphicon-log-out"></i>
                                                Выход </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">

                            <div className={ (VIEW == "accounts") ? "hidden": null}>
                                <div className="custom-search-input m-b-10">
                                    <div className="input-group col-md-12">
                                        <input type="text" className="form-control input-lg" placeholder="Начинайте вводить имя пользователя"
                                               value={this.state.userFilter}
                                               onChange={this.handleFilterChange.bind(this)}
                                        />
                                    </div>
                                </div>

                                <div className="table-container">
                                    <table className="table table-filter">
                                        <tbody>
                                        {this.props.AccountReducer.accounts.map(function(result, i) {
                                            return <User data={result} key={i}/>;
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className={ (VIEW == "transactions") ? "hidden": null}>


                                <div className="panel panel-primary b-r-0">
                                    <div className="panel-heading b-r-0">
                                        Транзакции
                                    </div>
                                    <div className="panel-body b-r-0">
                                        <table className="table table-striped text-center m-b-0">
                                            <tbody>
                                                {this.props.AccountReducer.transactions.map(function(result, i) {
                                                    return <Transaction data={result} key={i} />;
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}