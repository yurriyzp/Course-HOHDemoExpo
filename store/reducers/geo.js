/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { GET_REQUESTS_NEAR_ME_LOADING, GET_VOLUNTEERS_NEAR_ME_FAILED, SET_VOLUNTEERS_NEAR_ME, GET_VOLUNTEERS_NEAR_ME_LOADING, GET_REQUESTS_NEAR_ME_FAILED,SET_REQUESTS_NEAR_ME } from "../actions/actionTypes";

export const geoReducer=(state={
    volunteers_near:[],
    requests_near:[],
    isLoading: false,
    errMess: null,
},action)=>{
    switch (action.type){
    case GET_VOLUNTEERS_NEAR_ME_LOADING:
            return {...state,isLoading:true,errMess:null};

    case GET_VOLUNTEERS_NEAR_ME_FAILED:
            return {...state,isLoading:false,errMess:action.message,volunteers_near:[]};
    
    case SET_VOLUNTEERS_NEAR_ME:
            return {...state,isLoading:false,errMess:null,volunteers_near:action.payload};
    

    case GET_REQUESTS_NEAR_ME_LOADING:
        return {...state,isLoading:true,errMess:null};

    case GET_REQUESTS_NEAR_ME_FAILED:
        return {...state,isLoading:false,errMess:action.message,requests_near:[]};

    case SET_REQUESTS_NEAR_ME:
        return {...state,isLoading:false,errMess:null,requests_near:action.payload}


    default: 
       return state;
    }   
}