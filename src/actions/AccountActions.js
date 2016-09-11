/**
 * Created by sasha on 11.09.16.
 */

import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';

export function resolveUsers(data){
    return {
        type: types.RESOLVE_USERS,
        data: data
    };
}

export function resolveData(data){
    return {
        type: types.RESOLVE_DATA,
        data: data
    };
}

export function logOut(dispatch){

    return {
        type: types.LOG_OUT,
        users: axios.get('/api/logout')
            .then((response) => {
                browserHistory.push('/login');
            })
            .catch((error) => {
                console.log(error);
            })
    };
}

export function updateData(dispatch){

    return {
        type: types.UPDATE_DATA,
        users: axios.get('/api/users')
            .then((response) => {
                dispatch({
                    type: types.RESOLVE_USERS,
                    data: response.data
                });
            })
            .catch((error) => {
                console.error(error);
            }),
        data: axios.get('/api/data')
            .then((response) => {
                dispatch({
                    type: types.RESOLVE_DATA,
                    data: response.data
                });
            })
            .catch((error) => {
                console.error(error);
            })
    };
}

export function createTransaction(credentials){
    return {
        type: types.CREATE_TRANSACTION,
        payload: axios.post('/api/createtransaction/', {
            target: credentials.target,
            value: credentials.value
        },{
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
                if(response.data.status == "not enough money"){
                    credentials.dispatch(showNotification({
                        message: "Недостаточно PW для проведения транзакции"
                    }));
                    setTimeout(()=>{
                        credentials.dispatch(hideNotification({
                            message: "Недостаточно PW для проведения транзакции"
                        }));
                    },5000);
                }else if(response.data.status == "illegal transaction"){
                    credentials.dispatch(showNotification({
                        message: "Сумма в транзакции указана неверно"
                    }));
                    setTimeout(()=>{
                        credentials.dispatch(hideNotification({
                            message: "Сумма в транзакции указана неверно"
                        }));
                    },5000);
                }else{
                    credentials.dispatch(updateData(credentials.dispatch));
                }
            })
            .catch((error) => {

            })
    };
}

export function showAccounts(){
    return {
        type: types.SHOW_ACCOUNTS
    };
}

export function showTransactions(){
    return {
        type: types.SHOW_TRANSACTIONS
    };
}

export function filterUsers(data){
    return {
        type: types.FILTER_USERS,
        data: data.filterUser
    };
}

export function checkUser(){
    return {
        type: types.CHECK_USER,
        payload: axios.get('/api/checkauth')
            .then((response) => {
                console.log(response);
                if(response.data.login == "failed") {
                    browserHistory.push('/login');
                }
            })
            .catch((error) => {
                var serviceError = "Service not available";
                alert(serviceError);
                console.error(error);
            })
    };
}

export function hideNotification(credentials){
    return {
        type: types.HIDE_NOTIFICATION,
        data: credentials
    };
}

export function showNotification(credentials){
    return {
        type: types.SHOW_NOTIFICATION,
        data: credentials
    };
}