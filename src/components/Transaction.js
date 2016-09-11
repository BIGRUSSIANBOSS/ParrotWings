/**
 * Created by sasha on 09.09.16.
 */
import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActions from '../actions/AccountActions';

@connect(state => ({
    AccountReducer: state.AccountReducer
}))
export default class Transaction extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
    }

    handleClick(){
        var user = this.props.data.target;
        var val = this.props.data.value;

        const { dispatch } = this.props;
        const actions = bindActionCreators(AccountActions, dispatch);
        dispatch(actions.createTransaction({
            target: user,
            value: val,
            dispatch
        }));
    }

    render () {

        return (
            <tr className={(this.props.AccountReducer.user == this.props.data.source
                        ? "danger"
                        : "success"
                )}>
                {(this.props.AccountReducer.user == this.props.data.source
                        ? <td>{this.props.data.source}</td>
                        : <td>{this.props.data.target}</td>
                )}
                {(this.props.AccountReducer.user == this.props.data.source
                        ? <td><span className="glyphicon glyphicon-chevron-right"></span></td>
                        : <td><span className="glyphicon glyphicon-chevron-left"></span></td>
                )}
                {(this.props.AccountReducer.user == this.props.data.source
                        ? <td>{this.props.data.target}</td>
                        : <td>{this.props.data.source}</td>
                )}
                <td>{this.props.data.value}</td>
                <td>{(new Date(this.props.data.date)).toDateString()}</td>
                <td>{(new Date(this.props.data.date)).toTimeString()}</td>
                <td>{(this.props.AccountReducer.user == this.props.data.source
                        ? <span className="glyphicon glyphicon-refresh pointer" onClick={this.handleClick.bind(this)}></span>
                        : null
                )}</td>
            </tr>
        );
    }

}