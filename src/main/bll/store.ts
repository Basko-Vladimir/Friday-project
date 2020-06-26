import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {authReducer} from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));