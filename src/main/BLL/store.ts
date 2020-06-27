import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { signInReducer } from '../../features/Sign-In/bll/signInReducer';

const rootReducer = combineReducers({
    signIn: signInReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));