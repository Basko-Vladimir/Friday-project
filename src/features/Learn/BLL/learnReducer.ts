import {AppStateType} from '../../../main/BLL/store';
import { ThunkAction } from 'redux-thunk';
import { isLoading } from '../../Sign-Up/BLL/SignUpReducer';
import {getItemFromLS, setItemToLS} from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {learnAPI} from "../DAL/learnAPI";
import {setAuthMe} from "../../Sign-In/BLL/signInReducer";
import {CardItemType} from "../../Cards/types";

const UPDATE_GRADE = 'learn/learnReducer/UPDATE_GRADE';
const SET_CARDS = 'learn/learnReducer/SET_CARDS';
const SET_GRADE_MESSAGE = 'learn/learnReducer/SET_GRADE_MESSAGE';

const initialState = {
    cards: [] as Array<CardItemType>,
    pageCount: 20,
    gradeMessage: ''
};

type StateType = typeof initialState;
type ActionsType = UpdateGradeType | SetPacksType | SetGradeMessageType;

export const learnReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.cards
            };
        case UPDATE_GRADE:
            return {
                ...state
            };
        case SET_GRADE_MESSAGE:
            return {
                ...state, gradeMessage: action.message
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

type SetGradeMessageType = ReturnType<typeof setGradeMessage>
export const setGradeMessage = (message: string) => ({type: SET_GRADE_MESSAGE, message} as const);

// Типы, которые может диспатчить санка
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UpdateGradeType
    | SetPacksType | IsLoadingACType | SetMessageTextType | SetGradeMessageType>;


export const getCards = (token: string, packId: string): ThunkType => async (dispatch) => {

    try {
        dispatch(isLoading(true));
        // const userData = await dispatch(setAuthMe(token));
        const token  = getItemFromLS('token')
        if (token) {
            const cardsData = await learnAPI.getCards(token, packId, 20);
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
        dispatch(setGradeMessage('Done!'));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

