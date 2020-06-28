import {Dispatch} from 'redux';
import {authAPI} from '../DAL/api';
import {UserDataType} from '../types/types';

const SET_USER_DATA = 'cards/signInReducer/SET_USER_DATA';
const LOGIN_SUCCESS = 'cards/signInReducer/LOGIN_SUCCESS';
const SET_ERROR = 'cards/signInReducer/SET_ERROR';

const initialState = {
    isAuth: false,
    userData: {} as UserDataType,
    errorMessage: 'ERROR'
};

export type StateType = typeof initialState;

export const signInReducer = (state: StateType = initialState, action: SignInActionsTypes): StateType => {
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

type SignInActionsTypes = SetUserDataType | LoginSuccessType | SetErrorType;

type SetUserDataType = ReturnType<typeof setUserData>
const setUserData = (userData: UserDataType) => ({type: SET_USER_DATA, userData} as const);

type LoginSuccessType = ReturnType<typeof loginSuccess>;
const loginSuccess = (isAuth: boolean) => ({type: LOGIN_SUCCESS, isAuth} as const);

type SetErrorType = ReturnType<typeof setErrorText>;
export const setErrorText = (errorMessage: string) => ({type: SET_ERROR, errorMessage} as const);


export const login = (email: string, password: string, isRemember: boolean ) => {
    return async (dispatch: Dispatch) => {
        const result = await authAPI.login(email, password, isRemember);
        if (result.status >= 200 && result.status < 300) {
            debugger
            setAuthUser(result.data.token)
        } else {
            dispatch(setErrorText(result.data.error))
        }
    };
};

export const setAuthUser = (token: string) => async (dispatch: Dispatch) => {
    const userData = await authAPI.authMe(token);
    debugger;
};

