import {Dispatch} from 'redux';
import {authAPI} from '../DAL/api';
import {UserDataType} from '../types/types';
import { ThunkAction } from 'redux-thunk';
import {AppStateType} from '../../../main/BLL/store';
const SET_USER_DATA = 'cards/signInReducer/SET_USER_DATA';
const LOGIN_SUCCESS = 'cards/signInReducer/LOGIN_SUCCESS';
const SET_ERROR = 'cards/signInReducer/SET_ERROR';

const initialState = {
    isAuth: false,
    userData: null as UserDataType | null,
    errorMessage: ''
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
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};

type ActionsTypes = SetUserDataType | LoginSuccessType | SetErrorType;

type SetUserDataType = ReturnType<typeof setUserData>
export const setUserData = (userData: UserDataType | null) => ({type: SET_USER_DATA, userData} as const);

type LoginSuccessType = ReturnType<typeof loginSuccess>;
export const loginSuccess = (isAuth: boolean) => ({type: LOGIN_SUCCESS, isAuth} as const);

export type SetErrorType = ReturnType<typeof setErrorText>;
export const setErrorText = (errorMessage: string) => ({type: SET_ERROR, errorMessage} as const);



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const login = (email: string, password: string, isRemember: boolean ):ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, isRemember);
        if (response.status >= 200 && response.status < 300) {
            await dispatch(setAuthMe(response.data.token))          // зачем просит await ??
        } else {
            dispatch(setErrorText(response.data.error))
        }
    };
};

export const setAuthMe = (token: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await authAPI.authMe(token);
    if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('token', response.data.token);
        dispatch(setUserData({...response.data}));
        dispatch(loginSuccess(true));
    }
};



