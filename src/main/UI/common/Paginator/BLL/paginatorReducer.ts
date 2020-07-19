import {CardItemType} from "../../../../../features/Cards/types";
import {AppStateType} from "../../../../BLL/store";
import {IsLoadingACType} from "../../../../../features/Sign-Up/BLL/SignUpTypes";
import {setMessageText, SetMessageTextType} from "../../../../BLL/appReducer";
import {isLoading} from "../../../../../features/Sign-Up/BLL/SignUpReducer";
import {setAuthMe} from "../../../../../features/Sign-In/BLL/signInReducer";
import {setItemToLS} from "../../../../../features/Sign-In/LS-service/localStorage";
import { ThunkAction } from 'redux-thunk';
import {paginatorAPI} from "../DAL/paginatorAPI";


const SET_CARDS = 'learn/learnReducer/SET_CARDS';

const initialState = {
    cards: [] as Array<CardItemType>,
    page: 1,
    pageCount: 5,
};

type StateType = typeof initialState;
type ActionsType = SetPacksType ;

export const paginatorReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_CARDS:
            debugger
            return {
                ...state,
            };
        default:
            return state;
    }
};

// Action Creators

type SetPacksType = ReturnType<typeof setCards>
export const setCards = (cards: Array<CardItemType>) => ({type: SET_CARDS, cards} as const);


// Типы, которые может диспатчить санка
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown,
     SetPacksType | IsLoadingACType | SetMessageTextType >;


export const getCards = (token: string, packId: string): ThunkType => async (dispatch) => {

    try {
        dispatch(isLoading(true));
        const userData = await dispatch(setAuthMe(token));
        if (userData) {
            const cardsData = await paginatorAPI.getCards(userData.token, packId, 20);
            setItemToLS('token', cardsData.token);
            dispatch(setCards(cardsData.cards));
        }
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};



