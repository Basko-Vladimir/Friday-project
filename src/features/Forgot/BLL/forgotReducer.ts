import {Dispatch} from 'redux';
import {forgotAPI} from '../DAL/forgotAPI';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';

const SET_FORGOT_SUCCESS = 'cards/forgotReducer/SET_FORGOT_SUCCESS';

const initialState = {
    forgotSuccess: false
};

type StateType = typeof initialState;

export const forgotReducer = (state: StateType = initialState, action: SetForgotSuccessType): StateType => {
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

type ActionsType = SetForgotSuccessType | SetMessageTextType | IsLoadingACType;

type SetForgotSuccessType = ReturnType<typeof setForgotSuccess>
export const setForgotSuccess = (success: boolean) => ({type: SET_FORGOT_SUCCESS, success} as const);

export const sendEmail = (email: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(isLoading(true));
        await forgotAPI.sendEmail(email);
        dispatch(setForgotSuccess(true));
        dispatch(setMessageText('Success! Check your email'))
    } catch (err) {
        dispatch(setMessageText(err.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};