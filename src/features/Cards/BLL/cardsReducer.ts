import {AppStateType} from '../../../main/BLL/store';
import { ThunkAction } from 'redux-thunk';
import {Dispatch} from 'redux';
import { isLoading } from '../../Sign-Up/BLL/SignUpReducer';
import { setItemToLS } from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {cardsAPI} from '../DAL/cardsAPI';
import { CardItemType } from '../types';

const SET_CARDS = 'cards/packsReducer/SET_CARDS';
const UPDATE_CARD = 'cards/packsReducer/UPDATE_CARD';

const initialState = {
    cards: [] as Array<CardItemType>
};

type StateType = typeof initialState;
type ActionsType = SetPacksType | UpdateCardType | SetMessageTextType | IsLoadingACType;

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
              cards: state.cards.map( c => c._id === action.cardId ? {...c, ...action.newCard} : c )
            };
        default:
            return state;
    }
};

type SetPacksType = ReturnType<typeof setCards>
const setCards = (cards: Array<CardItemType>) => ({type:SET_CARDS, cards} as const);

type UpdateCardType = ReturnType<typeof updateCardAC>;
const updateCardAC = (cardId: string, newCard: CardItemType) => ({type: UPDATE_CARD, cardId, newCard} as const);

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getCards = (token: string, packId: string) =>  async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(isLoading(true));
        const data = await cardsAPI.getCards(token, packId);
        setItemToLS('token', data.token);
        dispatch(setCards(data.cards));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const addCard  = (token: string, packId: string): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await cardsAPI.addCard(token, packId);
        await dispatch(getCards(data.token, data.newCard.cardsPack_id));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }

};

export const changeCard = (cardId: string, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await cardsAPI.updateCard(cardId, token);
        setItemToLS('token', data.token);
        dispatch(updateCardAC(data.updatedCard._id, data.updatedCard));
    } catch(e){
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