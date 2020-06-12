/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT_REQUEST,LOGOUT_SUCCESS} from "./actionTypes";
import { baseUrl } from './baseUrl'
import { AsyncStorage } from 'react-native';
export const login=(creds)=>
    {return async dispatch=>{
        
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'auth/login', {
        method: 'POST',
   
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            
          },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            if (response.status!=401 && response.status!=403){
              var error = new Error('Server Error: ' + response.status);
            
            
              throw error;
              console.log(response);
            }
            return response;
            
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
         
           
           AsyncStorage.setItem('token', response.token);
           AsyncStorage.setItem('creds', JSON.stringify(creds));
           
           
            
            dispatch(receiveLogin(response));
        }
        else {
        
            var error = new Error('Error ' + response.status);
            
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))

    }
}






export const requestLogin = (creds) => {
    return {
        type: LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: LOGIN_SUCCESS,
        token: response.token,
        user: response.user
    }
}
  
export const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        message
    }
}









export const signup=(creds)=>{
    return async dispatch=>{
        dispatch(requestSignup(creds))

        return fetch(baseUrl + 'auth/signup', {
            method: 'POST',
            mode: "cors",
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(creds)
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {

                if (response.status!=401 && response.status!=403 && response.status!=500){
              var error = new Error('Server Error: ' + response.status);
            
            
              throw error;
            }
            return response;
            }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
              
                
                dispatch(receiveSignup(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                
                throw error;
            }
        })
        .catch(error => dispatch(signupError(error.message)))
    }

}

export const requestSignup = (creds) => {
    return {
        type: SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveSignup = (response) => {
    return {
        type: SIGNUP_SUCCESS,
        token: response.token
    }
}
  
export const signupError = (message) => {
    return {
        type: SIGNUP_FAILURE,
        message
    }
}

export const logout=()=>
    dispatch=>{
        dispatch(requestLogout())
         
        
        dispatch(receiveLogout())
}



export const requestLogout = () => {
    return {
      type:LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: LOGOUT_SUCCESS
    }
}