import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {SingUpReducer} from '../../features/Sign-Up/BLL/SignUpReducer';
import { signInReducer } from '../../features/Sign-In/BLL/signInReducer';
import {forgotReducer} from '../../features/Forgot/BLL/forgotReducer';
import {setNewPassReducer} from '../../features/Set-New-Pass/BLL/setNewPassReducer';
import { appReducer } from './appReducer';
import {packsReducer} from '../../features/Packs/BLL/packsReducer';

const rootReducer = combineReducers({
    app: appReducer,
    signUp: SingUpReducer,
    signIn: signInReducer,
    forgot: forgotReducer,
    setNewPass: setNewPassReducer,
    packs: packsReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));