import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {SingUpReducer} from '../../features/Sign-Up/BLL/SignUpReducer';
import { signInReducer } from '../../features/Sign-In/BLL/signInReducer';
import {forgotReducer} from '../../features/Forgot/BLL/forgotReducer';
import {setNewPassReducer} from '../../features/Set-New-Pass/BLL/setNewPassReducer';
import { appReducer } from './appReducer';
import {packsReducer} from '../../features/Packs/BLL/packsReducer';
import {cardsReducer} from '../../features/Cards/BLL/cardsReducer';
import {learnReducer} from "../../features/Learn/BLL/learnReducer";

const rootReducer = combineReducers({
    app: appReducer,
    signUp: SingUpReducer,
    signIn: signInReducer,
    forgot: forgotReducer,
    setNewPass: setNewPassReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));