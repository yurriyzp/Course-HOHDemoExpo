import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import {authReducer} from "./reducers/auth";
import {chatReducer} from "./reducers/chat";
import {geoReducer} from "./reducers/geo";
import {requestsReducer} from "./reducers/requests";
export default  ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            
            auth: authReducer,
            chat: chatReducer,
            geo: geoReducer,
            requests:requestsReducer
            
        }),
        applyMiddleware(thunk, )
    );

    return store;
}