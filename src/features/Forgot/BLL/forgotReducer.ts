import {Dispatch} from 'redux';
import {forgotAPI} from '../DAL/api';
import {setErrorText, SetErrorType} from '../../Sign-In/BLL/signInReducer';

const SET_FORGOT_SUCCESS = 'cards/forgotReducer/SET_FORGOT_SUCCESS';

const initialState = {
    forgotSuccess: false
};

type StateType = typeof initialState;

export const forgotReducer = (state: StateType = initialState, action: SetForgotSuccess):StateType => {
    switch (action.type) {
        case SET_FORGOT_SUCCESS:
            return {
                ...state,
                forgotSuccess: action.success
            };
        default:
            return state;
    }
};

type ActionsType = SetForgotSuccess | SetErrorType;

type SetForgotSuccess = ReturnType<typeof setForgotSuccess>
const setForgotSuccess = (success: boolean) => ({type:SET_FORGOT_SUCCESS, success} as const);

export const sendEmail = (email: string) => async (dispatch: Dispatch<ActionsType>) => {
    const data = await forgotAPI.sendEmail(email);
    if (data.success) {
        dispatch(setForgotSuccess(data.success))
    } else {
        dispatch(setErrorText(data.error))
    }
};