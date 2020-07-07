import {Dispatch} from 'redux';
import {authAPI} from '../DAL/signInAPI';
import {UserDataType} from '../types/ResponseSuccessTypes';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../../../main/BLL/store';
import {setItemToLS} from '../LS-service/localStorage';
import {SetMessageTextType, setMessageText} from '../../../main/BLL/appReducer';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';
import { IsLoadingACType } from '../../Sign-Up/BLL/SignUpTypes';

const SET_USER_DATA = 'cards/signInReducer/SET_USER_DATA';
const LOGIN_SUCCESS = 'cards/signInReducer/LOGIN_SUCCESS';

const initialState = {
    isAuth: false,
    userData: null as UserDataType | null,
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
        default:
            return state;
    }
};

type ActionsTypes = SetUserDataType | LoginSuccessType | SetMessageTextType | IsLoadingACType;

type SetUserDataType = ReturnType<typeof setUserData>
export const setUserData = (userData: UserDataType | null) => ({type: SET_USER_DATA, userData} as const);

type LoginSuccessType = ReturnType<typeof loginSuccess>;
export const loginSuccess = (isAuth: boolean) => ({type: LOGIN_SUCCESS, isAuth} as const);

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const login = (email: string, password: string, isRemember: boolean): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const data = await authAPI.login(email, password, isRemember);
            setItemToLS('token', data.token);
            dispatch(setUserData({...data}));
            dispatch(loginSuccess(true));
        } catch (err) {
            dispatch(setMessageText(err.response.data.error))
        } finally {
            dispatch(isLoading(false));
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
        dispatch(loginSuccess(false));
        console.log(err.response.data.error);
    }
};



