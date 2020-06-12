/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import {  GET_MESSAGES_LOADING, GET_MESSAGES_FAILED, SET_MESSAGES,SET_RECEIVER } from "../actions/actionTypes";

export const chatReducer=(state={
    messages:[],
    isLoading: false,
    errMess: null,
    receiver:null,
    
},action)=>{
    switch (action.type){
        
        case SET_RECEIVER:
            return {...state,receiver:action.id}    


        case GET_MESSAGES_LOADING:
            return {...state,isLoading:true,errMess:null};
        case GET_MESSAGES_FAILED:
            return {...state,isLoading:false,errMess:action.message};
        case SET_MESSAGES:
            return {...state,isLoading:false,errMess:null,messages:action.payload}        
    

    
    }
    return state;   
}