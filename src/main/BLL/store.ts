import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {SingUpReducer} from '../../features/Sign-Up/BLL/SignUpReducer';
import { signInReducer } from '../../features/Sign-In/BLL/signInReducer';
import {forgotReducer} from '../../features/Forgot/BLL/forgotReducer';

const rootReducer = combineReducers({
    signUp: SingUpReducer,
    signIn: signInReducer,
    forgot: forgotReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));