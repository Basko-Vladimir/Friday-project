import {AppStateType} from '../../../main/BLL/store';
import { ThunkAction } from 'redux-thunk';
import {Dispatch} from 'redux';
import { isLoading } from '../../Sign-Up/BLL/SignUpReducer';
import { setItemToLS } from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {learnAPI} from "../DAL/learnAPI";
import {setAuthMe} from "../../Sign-In/BLL/signInReducer";
import {cardsAPI} from "../../Cards/DAL/cardsAPI";
import {CardItemType} from "../../Cards/types";

const UPDATE_GRADE = 'learn/learnReducer/UPDATE_GRADE';
const SET_CARDS = 'learn/learnReducer/SET_CARDS';

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

// Action Creators
type UpdateGradeType = ReturnType<typeof updateGrade>
const updateGrade = (grade: number) => ({type:UPDATE_GRADE, grade} as const);

type SetPacksType = ReturnType<typeof setCards>
export const setCards = (cards: Array<CardItemType>) => ({type: SET_CARDS, cards} as const);

// Типы, которые может диспатчить санка
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UpdateGradeType | SetPacksType | IsLoadingACType | SetMessageTextType>;


export const getCards = (token: string, packId: string, sortParams?: string): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const userData = await dispatch(setAuthMe(token));
        if (userData) {
            const cardsData = await learnAPI.getCards(userData.token, packId, sortParams);
            setItemToLS('token', cardsData.token);
            dispatch(setCards(cardsData.cards));
        }
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};


export const setNewGrade = (token: string, grade: number, cardId: string): ThunkType =>  async (dispatch) => {
    try {

        dispatch(isLoading(true));
        const data = await learnAPI.putGrade(token, grade, cardId);
        setItemToLS('token', data.token);
        dispatch(updateGrade(data.grade));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

