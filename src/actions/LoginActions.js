/**
 * Created by sasha on 11.09.16.
 */

import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';

export function checkUser(){
    return {
        type: types.CHECK_USER,
        payload: axios.get('/api/checkauth')
            .then((response) => {
                if(response.data.login == "success") {
                    browserHistory.push('/account');
                }
            })
            .catch((error) => {
                var serviceError = "Service not available";
                alert(serviceError);
                console.log(error);
            })
    };
}

export function logIn(credentials){
    return {
        type: types.LOG_IN,
        payload: axios.post('/api/auth/', {
            user: credentials.user,
            pass: credentials.password
        },{
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            switch(response.data.status){
                case "success":
                    browserHistory.push('/account');
                    break;
                case "user-not-found":
                    credentials.dispatch(showNotification({
                        message: "Пользователь не найден или вы ввели неверрный пароль"
                    }));
                    setTimeout(()=>{
                        credentials.dispatch(hideNotification({
                            message: "Пользователь не найден или вы ввели неверрный пароль"
                        }));
                    },5000);
                    break;
                default:

                    break;
            }
        })
        .catch((error) => {

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

export function registerUser(credentials){
    return {
        type: types.REGISTER,
        payload: axios.post('/api/addnewuser/', {
            email: credentials.email,
            user: credentials.user,
            pass: credentials.password
        },{
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            credentials.dispatch(logIn({
                user: credentials.user,
                password: credentials.password
            }));
        }).catch((error) => {

        })
    };
}