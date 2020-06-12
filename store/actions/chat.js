/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { GET_MESSAGES_FAILED, GET_MESSAGES_LOADING, SET_MESSAGES, SEND_MESSAGE_FAILED,SEND_MESSAGE,SET_RECEIVER } from "./actionTypes"
import { baseUrl } from './baseUrl'
export const get_messages=(token)=>{
    return async dispatch=>{

        dispatch(getMessagesStart());
        const bearer = 'Bearer ' + token;

        return fetch(baseUrl + 'chat',
        {
            method: 'GET',
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload =>   dispatch(setMessages(payload)))
        .catch(error =>    dispatch(getMessagesError(error.message)))

    }

}

export const getMessagesError=(message)=>{
    return{
        type:GET_MESSAGES_FAILED,
        message
    }
}

export const getMessagesStart=()=>{
    return {
        type:GET_MESSAGES_LOADING,
    }
}


export const setMessages=(payload)=>{
        return {
        type:SET_MESSAGES,
        payload
    
        }
    }    





    export const setReceiver=(id)=>{
        return {
            type:SET_RECEIVER,
            id
        }
    }
    
