
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActions from '../actions/AccountActions';

@connect(state => ({
    LoginReducer: state.LoginReducer,
    AccountReducer: state.AccountReducer
}))
export default class Header extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
    }

    logOut(e){
        e.preventDefault();
        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.logOut(dispatch));
    }

    render () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Parrot Wings</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#" onClick={this.logOut.bind(this)}>Выход</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}