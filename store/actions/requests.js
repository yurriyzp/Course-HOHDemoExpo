/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { REQUESTS_FAILED, REQUESTS_LOADING, SET_REQUESTS, PLACE_REQUEST, PLACE_REQUEST_FAILED, PLACE_REQUEST_LOADING, CHANGE_REQUEST_LOADING,CHANGE_REQUEST_FAILED, CHANGE_REQUEST, REQUEST_FAILED, REQUEST_LOADING, SET_REQUEST, DELETE_REQUEST_FAILED, DELETE_REQUEST_LOADING, DELETE_REQUEST } from "./actionTypes"
import { baseUrl } from './baseUrl'
export const get_requests=(token)=>{
    return async dispatch=>{
   
        dispatch(requestsStart());
        const bearer = 'Bearer ' + token;

        return fetch(baseUrl + 'requests',
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
        .then(payload =>   dispatch(set_requests(payload)))
        .catch(error =>    dispatch(requestsError(error.message)))
    }

}

export const requestsError=(message)=>{
    return{
        type:REQUESTS_FAILED,
        message
    }
}

export const requestsStart=()=>{
    return {
        type:REQUESTS_LOADING
    }
}

export const set_requests=(payload)=>{
    return {
        type:SET_REQUESTS,
        payload
    }
}






export const place_request=(token,name,typ="",goods=[],description="",purpose="",amount=0,ccnumber="",)=>{
    return async dispatch=>{
        
        dispatch(placeRequestStart());

        
        const bearer = 'Bearer ' + token;
        let payload={

        };

        switch(typ){
            case "goods":
                payload={
                    name:name,
                    isGoods:true,
                    goods:goods,
                    
                };
                break;
            case "delivery":
                payload={
                    name:name,
                    isDelivery:true,
                    goods:goods
                };
                break;
            case "service":
                payload={
                    name:name,
                    isService:true,
                    description:description
                };
                break;
            case "money":
                payload={
                    name:name,
                    amount:amount,
                    purpose:purpose,
                    ccnumber:ccnumber,
                    isMoney:true,
                }
                break;
        }

        return fetch(baseUrl + 'requests',
        {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body:JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
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
        .then(payload =>   {

            if (payload.success)
                dispatch(placeRequest(payload));
            else {
                var error = new Error('Error ' + response.status);
            
                throw error;
            }
            
        }
            
          )
        .catch(error =>    dispatch(placeRequestError(error.message)))


        

    }

}


export const placeRequestError=(message)=>{
    return{
        type:PLACE_REQUEST_FAILED,
        message
    }
}

export const placeRequestStart=()=>{
    return {
        type:PLACE_REQUEST_LOADING
    }
}

export const placeRequest=(payload)=>{
        return {type:PLACE_REQUEST,
        payload
        }
 }




export const change_request=(token,id,request)=>{
    return async dispatch=>{
        dispatch(changeRequestStart());
        const bearer = 'Bearer ' + token;


        return fetch(baseUrl + 'requests/'+id,
        {
            method: 'PUT',
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body:JSON.stringify(request)
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
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
        .then(payload =>   {

            if (payload.success)
                dispatch(changeRequest(payload,id));
            else {
                var error = new Error('Error ' + response.status);
            
                throw error;
            }
            
        }
            
          )
        .catch(error =>    dispatch(changeRequestError(error.message)))




    }

}


export const changeRequestError=(message)=>{
    return{
        type:CHANGE_REQUEST_FAILED,
        message
    }
}

export const changeRequestStart=()=>{
    return {
        type:CHANGE_REQUEST_LOADING
    }
}

export const changeRequest=(payload,id)=>{
        return {type:CHANGE_REQUEST,
        id,
        payload
        }
    }





export const get_request=(token,id)=>{
   
        return async dispatch=>{
   
            dispatch(getRequestStart());
            const bearer = 'Bearer ' + token;
    
            return fetch(baseUrl + 'requests/'+id,
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
            .then(payload =>   dispatch(setRequest(payload)))
            .catch(error =>    dispatch(getRequestError(error.message)))
        }
        
        
        
     
    
}

export const getRequestError=(message)=>{
    return{
        type:REQUEST_FAILED,
        message
    }
}

export const getRequestStart=()=>{
    return {
        type:REQUEST_LOADING
    }
}

export const setRequest=(payload)=>{
        return {
        type:SET_REQUEST,
        
        payload
        }
    }


export const delete_request=(token,id)=>{
        return async dispatch=>{
            dispatch(deleteRequestStart());
            
            
                const bearer = 'Bearer ' + token;
        
        
                return fetch(baseUrl + 'requests/'+id,
                {
                    method: 'DELETE',
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    
                })
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
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
                .then(payload =>   {
        
                    if (payload.success)
                        dispatch(deleteRequest(payload,id));
                    else {
                        var error = new Error('Error ' + response.status);
                    
                        throw error;
                    }
                    
                }
                    
                  )
                .catch(error =>    dispatch(deleteRequestError(error.message)))
            
            
        }
    }
    
export const deleteRequestError=(message)=>{
        return{
            type:DELETE_REQUEST_FAILED,
            message
        }
    }
    
export const deleteRequestStart=()=>{
        return {
            type:DELETE_REQUEST_LOADING
        }
    }
    
export const deleteRequest=(id)=>{
            return {
            type:DELETE_REQUEST,
            id,
            }
        }    
    



