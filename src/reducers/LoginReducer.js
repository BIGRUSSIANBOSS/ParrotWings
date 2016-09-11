/**
 * Created by sasha on 11.09.16.
 */

import * as types from '../constants/ActionTypes';

const initialState = {
    "isFetching": false,
    "fetched": false,
    "error": null,
    "noty": {
        isActive: false,
        message: ""
    }
};

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOG_IN:
            return {
                ...state
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
        case types.CHECK_USER:
            return {
                ...state
            };
        default:
            return state;
    }
}
