import {Dispatch} from 'redux';
import {forgotAPI} from '../DAL/api';
import {SetMessageTextType, setMessageText} from '../../Sign-In/BLL/signInReducer';

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

type ActionsType = SetForgotSuccess | SetMessageTextType;

type SetForgotSuccess = ReturnType<typeof setForgotSuccess>
export const setForgotSuccess = (success: boolean) => ({type:SET_FORGOT_SUCCESS, success} as const);

export const sendEmail = (email: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        await forgotAPI.sendEmail(email);
        dispatch(setForgotSuccess(true));
        dispatch(setMessageText('Success! Check your email'))
    } catch (err) {
        dispatch(setForgotSuccess(false));
        dispatch(setMessageText(err.response.data.error))
    }
};