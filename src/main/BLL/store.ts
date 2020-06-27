import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {authReducer} from './authReducer';
import {SingUpReducer} from '../../features/Sign-Up/BLL/SignUpReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    signUp: SingUpReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));