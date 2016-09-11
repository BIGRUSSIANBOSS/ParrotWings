/**
 * Created by sasha on 11.09.16.
 */

import * as types from '../constants/ActionTypes';

const initialState = {
    "user": "",
    "accounts" : [],
    "isFetching": false,
    "fetched": false,
    "error": null,
    "sortDown": true,
    "transactions":[],
    "pwPoints": 0,
    "view": "accounts",
    "noty": {
        isActive: false,
        message: ""
    }
};

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case types.CHECK_USER:
            return {
                ...state
            };
        case types.SHOW_ACCOUNTS:
            return {
                ...state,
                view: "accounts"
            };;
        case types.SHOW_TRANSACTIONS:
            return {
                ...state,
                view: "transactions"
            };
        case types.FILTER_USERS:
            var newAccounts = [];
            for(var i in state.accounts){
                if(state.accounts[i].user.indexOf(action.data) != -1){
                    var newAccount = state.accounts[i];
                    delete newAccount.hide;
                    newAccounts.push(newAccount);
                }else{
                    var newAccount = state.accounts[i];
                    newAccount.hide = true;
                    newAccounts.push(newAccount);
                }
            }
            return {
                ...state,
                accounts: newAccounts
            };
        case types.HIDE_NOTIFICATION:
            return {
                ...state,
                noty: {
                    message: action.data.message,
                    isActive: false
                }
            };
        case types.SHOW_NOTIFICATION:
            return {
                ...state,
                noty: {
                    message: action.data.message,
                    isActive: true
                }
            };
        case types.RESOLVE_DATA:
            var summ = 0;
            for(var i in action.data.transactions){
                if(action.data.transactions[i].source == action.data.user){
                    summ -= Number(action.data.transactions[i].value);
                }
                if(action.data.transactions[i].target == action.data.user){
                    summ += Number(action.data.transactions[i].value);
                }
            }
            return {
                ...state,
                user: action.data.user,
                transactions: action.data.transactions,
                pwPoints: summ
            };
        case types.RESOLVE_USERS:
            return {
                ...state,
                accounts: action.data
            };
        default:
            return state;
    }
}
