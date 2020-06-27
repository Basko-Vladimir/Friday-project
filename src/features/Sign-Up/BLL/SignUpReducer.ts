import {
    ChatActionTypes, IS_LOADING,
    IsLoadingACType,
    SIGN_UP_ERROR,
    SIGN_UP_SUCCESS,
    SignUpErrorType,
    SignUpSuccessType
} from "./SignUpTypes";
import {Dispatch} from "redux";
import {SignUpAPI} from "../DAL/SignUpAPI";


const initialState = {
    isLoading: false,
    message: '',
    signUpSuccess: false
};

type StateType = typeof initialState;

export const SingUpReducer = (state: StateType = initialState, action: any): StateType => {
    switch (action.type) {
        default:
            return state;
    }
};


// Action Creators
export const isLoading = (value: boolean):IsLoadingACType => ({type: IS_LOADING, value});

const SignUpSuccess = (registeredSuccess: boolean)
    : SignUpSuccessType => ({type: SIGN_UP_SUCCESS, registeredSuccess});
export const SignUpError = (errorMessage: string)
    : SignUpErrorType => ({type: SIGN_UP_ERROR, errorMessage});

// Thunks

export const signUpTC = (email:string, password:string) =>
    async(dispatch: Dispatch<ChatActionTypes>)  => {
        try {
            dispatch(isLoading(true));
            const data = await SignUpAPI.SignUpAPI(email, password);
            if(data.error) {
                dispatch(SignUpError(data.error));
            } else
                dispatch(SignUpSuccess(data.success))
        } catch (e) {
            dispatch(SignUpError(e.response.data.error))
        }
        dispatch(isLoading(false));
    };





