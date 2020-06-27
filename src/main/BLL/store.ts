import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {SingUpReducer} from '../../features/Sign-Up/BLL/SignUpReducer';
import { signInReducer } from '../../features/Sign-In/bll/signInReducer';

const rootReducer = combineReducers({
    signUp: SingUpReducer,
    signIn: signInReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));