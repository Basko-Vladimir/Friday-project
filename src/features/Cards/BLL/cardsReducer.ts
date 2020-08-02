import {AppStateType} from '../../../main/BLL/store';
import {ThunkAction} from 'redux-thunk';
import {Dispatch} from 'redux';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';
import {getItemFromLS, setItemToLS} from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {cardsAPI} from '../DAL/cardsAPI';
import {CardItemType} from '../types';
import {setAuthMe} from '../../Sign-In/BLL/signInReducer';

const SET_CARDS = 'cards/packsReducer/SET_CARDS';
const UPDATE_CARD = 'cards/packsReducer/UPDATE_CARD';
const GET_TOTAL_COUNT = 'cards/packsReducer/GET_TOTAL_COUNT';
const SET_PAGE = 'cards/packsReducer/SET_PAGE';
const SET_CARD_QUESTION = 'cards/packsReducer/SET_CARD_QUESTION';
const SET_CARD_ANSWER = 'cards/packsReducer/SET_CARD_ANSWER';

const initialState = {
    cards: [] as Array<CardItemType>,
    pageCount: 5 as number,
    page: 1 as number,
    cardsTotalCount: 0 as number,
    cardQuestion: '' as string,
    cardAnswer: '' as string
};

type StateType = typeof initialState;
type ActionsType = SetPacksType | UpdateCardType | SetMessageTextType
    | IsLoadingACType | GetTotalCountType | SetPageType | SetCardQuestionType
    | SetCardAnswerType;

export const cardsReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.cards
            };
        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map(c => c._id === action.cardId ? {...c, ...action.newCard} : c)
            };
        case GET_TOTAL_COUNT:
            return {
                ...state, cardsTotalCount: action.cardsTotalCount
            };
        case SET_PAGE:
            return {
                ...state, page: action.value
            };
        case SET_CARD_QUESTION:
            return {
                ...state, cardQuestion: action.value
            };
        case SET_CARD_ANSWER:
            return {
                ...state, cardAnswer: action.value
            };
        default:
            return state;
    }
};
type SetCardQuestionType = ReturnType<typeof setCardQuestion>
export const setCardQuestion = (value: string) => ({type: SET_CARD_QUESTION, value} as const);

type SetCardAnswerType = ReturnType<typeof setCardAnswer>
export const setCardAnswer = (value: string) => ({type: SET_CARD_ANSWER, value} as const);

type SetPageType = ReturnType<typeof setPage>
export const setPage = (value: number) => ({type: SET_PAGE, value} as const);

type GetTotalCountType = ReturnType<typeof getTotalCount>
export const getTotalCount = (cardsTotalCount: number) => ({type: GET_TOTAL_COUNT, cardsTotalCount} as const);

type SetPacksType = ReturnType<typeof setCards>
export const setCards = (cards: Array<CardItemType>) => ({type: SET_CARDS, cards} as const);

type UpdateCardType = ReturnType<typeof updateCardAC>;
const updateCardAC = (cardId: string, newCard: CardItemType) => ({type: UPDATE_CARD, cardId, newCard} as const);

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getCards = (token: string, packId: string, sortParams?: string, searchQuery?: any): ThunkType => async (dispatch, getState) => {
    try {
        debugger
        dispatch(isLoading(true));
        // Диспатчить из коллбэка зануление Вопроса/Ответа, if !length
        // const userData = await dispatch(setAuthMe(token));
        const token = getItemFromLS('token') as string;
        const {page, pageCount, cardQuestion, cardAnswer} = getState().cards;
        dispatch(setCardQuestion(searchQuery));
        dispatch(setCardAnswer(searchQuery));
        if (token) {
            debugger
            const cardsData = await
                cardsAPI.getCards(token, packId, sortParams, page, pageCount, cardQuestion, cardAnswer);
            const totalCount = cardsData.cardsTotalCount;
            dispatch(getTotalCount(totalCount));
            setItemToLS('token', cardsData.token);
            debugger
            dispatch(setCards(cardsData.cards));
        }
    } catch (e) {
        debugger
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const addCard = (token: string, packId: string, question: string, answer: string): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await cardsAPI.addCard(token, packId, question, answer);
        await dispatch(getCards(data.token, data.newCard.cardsPack_id));
    } catch (e) {
        setItemToLS('token', e.response.data.token);
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }

};

export const changeCard = (cardId: string, token: string, question: string, answer: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await cardsAPI.updateCard(cardId, token, question, answer);
        setItemToLS('token', data.token);
        dispatch(updateCardAC(data.updatedCard._id, data.updatedCard));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const deleteCard = (cardId: string, token: string): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await cardsAPI.deleteCard(cardId, token);
        setItemToLS('token', data.token);
        await dispatch(getCards(data.token, data.deletedCard.cardsPack_id))
    } catch (e) {
        dispatch(setMessageText(e.response.data.error));
    } finally {
        dispatch(isLoading(false));
    }
};