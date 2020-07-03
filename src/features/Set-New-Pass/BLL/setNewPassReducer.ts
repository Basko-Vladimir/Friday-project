import { Dispatch } from "redux";
import {setNewPassAPI} from '../DAL/setNewPassAPI';
import { setMessageText } from "../../../main/BLL/appReducer";

const SET_NEW_PASS_SUCCESS = 'cards/setNewPassReducer/setNewPassReducer';

const initialState = {
    newPassSuccess: false
};

type StateType = typeof initialState;

export const setNewPassReducer = (state:StateType = initialState, action: setNewPassSuccessType): StateType => {
    switch (action.type) {
        case SET_NEW_PASS_SUCCESS:
            return {
                ...state,
                newPassSuccess: action.isSuccess
            };
        default:
            return state;
    }
};

type setNewPassSuccessType = ReturnType<typeof setNewPassSuccess>;
const setNewPassSuccess = (isSuccess: boolean) => ({type: SET_NEW_PASS_SUCCESS, isSuccess} as const);

export const setNewPassword = (password: string, token: string) => async (dispatch: Dispatch) => {
    try {
        await setNewPassAPI.setNewPass(password, token);
        dispatch(setNewPassSuccess(true));
        dispatch(setMessageText('Success! Password changed'));
    } catch (err) {
        dispatch(setMessageText(err.response.data.error));
    }

};