import {Dispatch} from 'redux';
import {authAPI} from '../DAL/api';
import {UserDataType} from '../types/ResponseSuccessTypes';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../../../main/BLL/store';
import {setItemToLS} from '../LS-service/localStorage';

const SET_USER_DATA = 'cards/signInReducer/SET_USER_DATA';
const LOGIN_SUCCESS = 'cards/signInReducer/LOGIN_SUCCESS';
const SET_MESSAGE_TEXT = 'cards/signInReducer/SET_MESSAGE_TEXT';

const initialState = {
    isAuth: false,
    userData: null as UserDataType | null,
    message: ''
};

export type StateType = typeof initialState;

export const signInReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_MESSAGE_TEXT:
            return {
                ...state,
                message: action.messageText
            };
        default:
            return state;
    }
};

type ActionsTypes = SetUserDataType | LoginSuccessType | SetMessageTextType;

type SetUserDataType = ReturnType<typeof setUserData>
export const setUserData = (userData: UserDataType | null) => ({type: SET_USER_DATA, userData} as const);

type LoginSuccessType = ReturnType<typeof loginSuccess>;
export const loginSuccess = (isAuth: boolean) => ({type: LOGIN_SUCCESS, isAuth} as const);

export type SetMessageTextType = ReturnType<typeof setMessageText>;
export const setMessageText = (messageText: string) => ({type: SET_MESSAGE_TEXT, messageText} as const);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const login = (email: string, password: string, isRemember: boolean): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.login(email, password, isRemember);
            setItemToLS('token', data.token);
            dispatch(setUserData({...data}));
            dispatch(loginSuccess(true));
        } catch (err) {
            dispatch(setMessageText(err.response.data.error))
        }
    };
};

export const setAuthMe = (token: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const data = await authAPI.authMe(token);
        setItemToLS('token', data.token);
        dispatch(setUserData({...data}));
        dispatch(loginSuccess(true));
    } catch (err) {
        console.log(err.response.data.error);
    }
};



