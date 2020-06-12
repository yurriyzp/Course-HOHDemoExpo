/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { GET_REQUESTS_NEAR_ME_FAILED, GET_REQUESTS_NEAR_ME_LOADING, SET_REQUESTS_NEAR_ME, GET_VOLUNTEERS_NEAR_ME_FAILED, GET_VOLUNTEERS_NEAR_ME_LOADING, SET_VOLUNTEERS_NEAR_ME } from "./actionTypes"
import { baseUrl } from './baseUrl'
export const get_volunteers_near_me=(token)=>{
   
        return async dispatch=>{
            dispatch(getVolunteersNearStart())
            const bearer = 'Bearer ' + token;
            return fetch(baseUrl + 'geo/volunteers',
            {
                method: 'POST',
                
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
            .then(payload =>   dispatch(setVolunteersNear(payload)))
            .catch(error =>     dispatch(getVolunteersNearError(error.message)))
        }
    

}

export const getVolunteersNearError=(message)=>{
    return{
        type:GET_VOLUNTEERS_NEAR_ME_FAILED,
        message
    }
}

export const getVolunteersNearStart=()=>{
    return {
        type:GET_VOLUNTEERS_NEAR_ME_LOADING,
    }
}

export const setVolunteersNear=(payload)=>{
        return {
        type:SET_VOLUNTEERS_NEAR_ME,
        payload
    
        }
    }    



export const get_requests_near_me=(token)=>{
    return async dispatch=>{
        dispatch(getRequestsNearStart())
        const bearer = 'Bearer ' + token;
        return fetch(baseUrl + 'geo/requests',
        {
            method: 'POST',
            
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
        .then(payload =>   dispatch(setRequestsNear(payload)))
        .catch(error =>     dispatch(getRequestsNearError(error.message)))
    }
        
       
    }
    


export const getRequestsNearError=(message)=>{
    return{
        type:GET_REQUESTS_NEAR_ME_FAILED,
        message
    }
}

export const getRequestsNearStart=()=>{
    return {
        type:GET_REQUESTS_NEAR_ME_LOADING,
    }
}

export const setRequestsNear=(payload)=>{
        return {
        type:SET_REQUESTS_NEAR_ME,
        payload
    
        }
    }    


