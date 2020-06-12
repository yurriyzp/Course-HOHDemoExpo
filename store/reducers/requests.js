/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { REQUEST_LOADING, REQUEST_FAILED, SET_REQUEST, 
    REQUESTS_LOADING,REQUESTS_FAILED,SET_REQUESTS,
     DELETE_REQUEST_LOADING, DELETE_REQUEST_FAILED, DELETE_REQUEST,
     PLACE_REQUEST_LOADING,PLACE_REQUEST_FAILED,PLACE_REQUEST,
     CHANGE_REQUEST_FAILED,CHANGE_REQUEST_LOADING, CHANGE_REQUEST } from "../actions/actionTypes";

export const requestsReducer=(state={
    
   requests:[],
    request:{},
    isLoading: false,
    errMess: null,


},action)=>{
    switch (action.type){
        case REQUEST_LOADING:
            return {...state, isLoading: true, errMess: null, request:{}};
        case REQUEST_FAILED:
            return {...state,isLoading:false,errMess:action.message,request:{}}    
        case SET_REQUEST:
            return {...state,isLoading:false,errMess:null,request:action.payload};
        

        case REQUESTS_LOADING:
            return {...state,isLoading:true,errMess:null,requests:[]};
        case REQUESTS_FAILED:
            return {...state,isLoading:false,errMess:action.message,requests:[]};
        case SET_REQUESTS:
            return {...state,isLoading:false,errMess:null,requests:action.payload};
        

        case PLACE_REQUEST_LOADING:
                return {...state,isLoading:true,errMess:null};
        case PLACE_REQUEST_FAILED:
                return {...state,isLoading:false,errMess:action.message};
        case PLACE_REQUEST:
                return {...state,isLoading:false,errMess:null,user_requests:state.user_requests.concat(action.payload)}                    
        

        case CHANGE_REQUEST_LOADING:
                return{...state,isLoading:true,errMess:null};
        case CHANGE_REQUEST_FAILED:
                return {...state,isLoading:false,errMess:action.message};
        case CHANGE_REQUEST:
            {
                let indx=state.requests.find((value,idx)=>{
                    if (value.id===action.id) return idx;
                })
                let arr=state.requests;
                arr[indx]=action.payload
                return {...state,isLoading:false,errMess:null,request:action.payload,requests:arr};
            }
            
        case DELETE_REQUEST_LOADING:
                return{...state,isLoading:true,errMess:null};
        case DELETE_REQUEST_FAILED:
                return {...state,isLoading:false,errMess:action.message};
        case DELETE_REQUEST:
            {
                let indx=state.requests.find((value,idx)=>{
                    if (value.id===action.id) return idx;
                })
                let arr=state.requests;
                arr.splice(indx);
                return {...state,isLoading:false,errMess:null,requests:arr};
            }
            default: return state;
       
    }
    
}