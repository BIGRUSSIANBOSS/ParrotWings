/**
 * Created by sasha on 09.09.16.
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AccountActions from '../actions/AccountActions';

import axios from 'axios';

@connect(state => ({
    AccountReducer: state.AccountReducer
}))
export default class User extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            sendValue: 0
        }
    }

    handleChangeSendValue (e) {
        this.setState({ sendValue: e.target.value });
    }
    
    handleSubmit (e) {

        var user = this.props.data.user;
        var val = this.state.sendValue;

        const { accounts, dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.createTransaction({
            target: user,
            value: val,
            dispatch
        }));
    }

    render () {
        var hideClass = "";
        if(this.props.data.hide){
            hideClass = "hidden";
        }
        return (

        <tr className={hideClass}>
            <td>
                <div className="media">
                    <a href="#" className="pull-left">
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" className="media-photo" />
                    </a>
                    <div className="media-body">
                        <span className="media-meta pull-right">{(new Date()).toDateString()}</span>
                        <h4 className="title">
                            {this.props.data.user}
                        </h4>
                        <p className="summary">{this.props.data.email}</p>

                        <div className="input-group">
                            <input type="text" className="form-control b-t-l-r-0 b-b-l-r-0" placeholder="Search for..."
                                   value={this.state.sendValue}
                                   onChange={this.handleChangeSendValue.bind(this)}
                            />
                              <span className="input-group-btn">
                                <button className="btn btn-default" type="button"
                                        onClick={this.handleSubmit.bind(this)}
                                >Отправить</button>
                              </span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        );
    }

}