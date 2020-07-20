import {CardItemType} from "../../../../../features/Cards/types";
import {AppStateType} from "../../../../BLL/store";
import {IsLoadingACType} from "../../../../../features/Sign-Up/BLL/SignUpTypes";
import {setMessageText, SetMessageTextType} from "../../../../BLL/appReducer";
import {isLoading} from "../../../../../features/Sign-Up/BLL/SignUpReducer";
import {setAuthMe} from "../../../../../features/Sign-In/BLL/signInReducer";
import {setItemToLS} from "../../../../../features/Sign-In/LS-service/localStorage";
import { ThunkAction } from 'redux-thunk';
import {paginatorAPI} from "../DAL/paginatorAPI";
import {packsAPI} from "../../../../../features/Packs/DAL/packsAPI";
import {setPacks} from "../../../../../features/Packs/BLL/packsReducer";


const SET_TOTAL_COUNT = 'paginator/paginatorReducer/SET_TOTAL_COUNT';
const SET_TOKEN = 'paginator/paginatorReducer/SET_TOKEN';


const initialState = {
    cards: [] as Array<CardItemType>,
    page: 1 as number,
    pageCount: 5 as number,
    cardPacksTotalCount: 0 as number,
    isToken: true
};

type StateType = typeof initialState;
type ActionsType = SetTotalCountType | SetTokenType;

export const paginatorReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_TOTAL_COUNT:
            debugger
            return {
                ...state, cardPacksTotalCount: action.cardPacksTotalCount
            };
        case SET_TOKEN:
            debugger
            return {
                ...state, isToken: !state.isToken
            };
        default:
            return state;
    }
};

// Action Creators


type SetTotalCountType = ReturnType<typeof setTotalCount>
export const setTotalCount = (cardPacksTotalCount: number) => ({type: SET_TOTAL_COUNT, cardPacksTotalCount} as const);

type SetTokenType = ReturnType<typeof setToken>
export const setToken = () => ({type: SET_TOKEN}as const)


// Типы, которые может диспатчить санка
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown,
    SetTotalCountType | IsLoadingACType | SetMessageTextType | SetTokenType >;


export const getTotalCount = (token: string): ThunkType => async (dispatch) => {
      debugger
    try {
        dispatch(isLoading(true));
        dispatch(setToken());
        const userData = await dispatch(setAuthMe(token));
        if (userData) {
            const packsData = await packsAPI.getPacks(userData.token);
            setItemToLS('token', packsData.token);
            debugger
            dispatch(setTotalCount(packsData.cardPacksTotalCount));
            dispatch(setToken())
        }
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};



