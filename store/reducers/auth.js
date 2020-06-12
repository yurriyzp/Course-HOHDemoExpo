/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE} from "../actions/actionTypes";
import { AsyncStorage } from 'react-native';

export const authReducer= (state = {
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: "",
        errMess: null,
        
    }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
               
            };
        case LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.token,
                user:action.user
            };
        case LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
               
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:false,
                errMess:"",
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:false,
                errMess:action.message
            }        
       
        default:
            return state
    }
}