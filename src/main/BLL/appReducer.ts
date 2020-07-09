import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';
import {setAuthMe} from '../../features/Sign-In/BLL/signInReducer';
import {isLoading} from '../../features/Sign-Up/BLL/SignUpReducer';
import {IsLoadingACType} from '../../features/Sign-Up/BLL/SignUpTypes';

const SET_MESSAGE_TEXT = 'cards/signInReducer/SET_MESSAGE_TEXT';
const SET_INITIALIZE = 'cards/signInReducer/SET_INITIALIZE';

const initialState = {
    message: '',
    isInitialized: false
};

export type StateType = typeof initialState;
type ActionsType = SetMessageTextType | SetInitializeType | IsLoadingACType;

export const appReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_MESSAGE_TEXT:
            return {
                ...state,
                message: action.messageText
            };
        case SET_INITIALIZE:
            return {
                ...state,
                isInitialized: true
            };
        default:
            return state;
    }
};

export type SetMessageTextType = ReturnType<typeof setMessageText>;
export const setMessageText = (messageText: string) => ({type: SET_MESSAGE_TEXT, messageText} as const);

type SetInitializeType = ReturnType<typeof setInitialize>;
const setInitialize = () => ({type: SET_INITIALIZE} as const);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const initializeApp = ():ThunkType  => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        await dispatch(setAuthMe(''));
        dispatch(setInitialize())
    } catch (e) {
        setMessageText(e.response.data.error)
    } finally {
        dispatch(isLoading(false));
    }
};


