import {Dispatch} from 'redux';
import {AppStateType} from '../../../main/BLL/store';
import {authAPI} from '../DAL/api';


const initialState = {
    isAuth: true,
    token: '',
    responseData: {},
    error: ''
};

export type StateType = typeof initialState;

export const signInReducer = (state: StateType = initialState, action: any): StateType => {
    switch (action.type) {
        default:
            return state;
    }
};

export const signIn = (email: string, password: string, isRemember: boolean ) => {
    return async (dispatch: Dispatch, getState: () => AppStateType) => {
        const result = await authAPI.signIn(email, password, isRemember);
    };
};

