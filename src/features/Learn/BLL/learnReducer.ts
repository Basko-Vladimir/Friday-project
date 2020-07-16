import {AppStateType} from '../../../main/BLL/store';
import { ThunkAction } from 'redux-thunk';
import {Dispatch} from 'redux';
import { isLoading } from '../../Sign-Up/BLL/SignUpReducer';
import { setItemToLS } from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import { CardItemType } from '../types';
import {learnAPI} from "../DAL/learnAPI";

const UPDATE_GRADE = 'learn/learnReducer/UPDATE_GRADE';

const initialState = {
    cards: [] as Array<CardItemType>
};

type StateType = typeof initialState;
// type ActionsType =| SetMessageTextType | IsLoadingACType;

export const learnReducer = (state: StateType = initialState, action: UpdateGradeType): StateType => {
    switch (action.type) {
        case UPDATE_GRADE:
            return {
                ...state
            };
        default:
            return state;
    }
};

type UpdateGradeType = ReturnType<typeof updateGrade>
const updateGrade = (grade: number) => ({type:UPDATE_GRADE, grade} as const);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UpdateGradeType>;

export const setNewGrade = (token: string, grade: number, cardId: string) =>  async (dispatch: Dispatch<UpdateGradeType>) => {
    try {

        // dispatch(isLoading(true));
        const data = await learnAPI.putGrade(token, grade, cardId);
        setItemToLS('token', data.token);
        dispatch(updateGrade(data.grade));
        // dispatch(updateGrade(data.card.grade));
    } catch (e) {
        // dispatch(setMessageText(e.response.data.error))
    } finally {
        // dispatch(isLoading(false));
    }
};

