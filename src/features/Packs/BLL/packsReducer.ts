import {Dispatch} from 'redux';
import {packsAPI} from '../DAL/packsAPI';
import {PackItemType} from '../types';
import {getItemFromLS, setItemToLS} from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../../../main/BLL/store';
import {setAuthMe} from '../../Sign-In/BLL/signInReducer';


const SET_PACKS = 'cards/packsReducer/SET_PACKS';
const UPDATE_PACK = 'cards/packsReducer/UPDATE_PACK';
const SET_NEW_PAGE = 'cards/packsReducer/SET_NEW_PAGE';
const SET_TOTAL_COUNT = 'paginator/paginatorReducer/SET_TOTAL_COUNT';
const SET_PAGE = 'paginator/paginatorReducer/SET_PAGE';
const SET_PACK_NAME = 'paginator/paginatorReducer/SET_PACK_NAME';

const initialState = {
    packs: [] as Array<PackItemType>,
    pageCount: 5 as number,
    page: 1 as number,
    cardPacksTotalCount: 0 as number,
    packName: '' as string
};

type StateType = typeof initialState;
type ActionsType = SetPacksType | UpdatePackType | SetMessageTextType
    | IsLoadingACType | SetNewPageType | SetTotalCountType | SetPageType | SetPackNameType;

export const packsReducer = (state: StateType = initialState, action: ActionsType ): StateType => {
    switch (action.type) {
        case SET_PACKS:
            return {
                ...state,
                packs: action.packs
            };
        case UPDATE_PACK:
            return {
                ...state,
                packs: state.packs.map(p => p._id === action.idPack ? {...p, ...action.newPack} : p)
            };
        case SET_NEW_PAGE:
            return {
                ...state,
                page: action.newPage
            };
        case SET_TOTAL_COUNT:
            return {
                ...state, cardPacksTotalCount: action.cardPacksTotalCount
            };
            case SET_PAGE:
            return {
                ...state, page: action.page
            };
        case SET_PACK_NAME:
            return {
                ...state, packName: action.searchQuery
            };
        default:
            return state;
    }
};

type SetPackNameType = ReturnType<typeof setPackName>
export const setPackName = (searchQuery: string) => ({type: SET_PACK_NAME, searchQuery} as const);

type SetPageType = ReturnType<typeof SetPage>
export const SetPage = (page: number) => ({type: SET_PAGE, page} as const);

type SetTotalCountType = ReturnType<typeof setTotalCount>
export const setTotalCount = (cardPacksTotalCount: number) => ({type: SET_TOTAL_COUNT, cardPacksTotalCount} as const);

type SetPacksType = ReturnType<typeof setPacks>
export const setPacks = (packs: Array<PackItemType>) => ({type: SET_PACKS, packs} as const);

type UpdatePackType = ReturnType<typeof updatePackAC>;
const updatePackAC = (idPack: string, newPack: PackItemType) => ({type: UPDATE_PACK, idPack, newPack} as const);

type SetNewPageType = ReturnType<typeof SetNewPageAC>;
export const SetNewPageAC = (newPage: number) => ({type: SET_NEW_PAGE, newPage} as const);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getPacks = (token: string, sortParams?: string): ThunkType => async (dispatch, getState) => {
    try {
        dispatch(isLoading(true));
        dispatch(setPackName(''));
        const userData = await dispatch(setAuthMe(token));
        const {page, pageCount, packName} = getState().packs;
        if (userData) {
            const packsData = await packsAPI.getPacks(userData.token, sortParams, pageCount, page, packName);
            dispatch(setTotalCount(packsData.cardPacksTotalCount));
            setItemToLS('token', packsData.token);
            dispatch(setPacks(packsData.cardPacks));
        }
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const getPacksForSearch = (searchQuery: string): ThunkType => async (dispatch: Dispatch<ActionsType>, getState) => {
    try {
        debugger
        dispatch(isLoading(true));
        dispatch(setPackName(searchQuery));
        const {page, pageCount, packName} = getState().packs;
        const token = getItemFromLS('token') as string;
        debugger
        const data = await packsAPI.getPacks(token, '', pageCount, page, packName);
        setItemToLS('token', data.token);

        // let result = data.cardPacks.filter((i: PackItemType) => {
        //     return i.name.match(new RegExp(searchQuery, 'g'));
        // });  // Поиск совпадений запроса в массиве колод
        debugger
        dispatch(setPacks(data.cardPacks));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const addPack = (token: string, packName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.addPack(token, packName);
        await dispatch(getPacks(data.token));
    } catch (e) {

        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }

};

export const changePack = (packId: string, token: string, newName: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(isLoading(true));
            const data = await packsAPI.updatePack(packId, token, newName);
            setItemToLS('token', data.token);
            dispatch(updatePackAC(packId, data.updatedCardsPack));
        } catch (e) {
            setItemToLS('token', e.response.data.token);
            dispatch(setMessageText(e.response.data.error))
        } finally {
            dispatch(isLoading(false));
        }
    };

export const deletePack = (packId: string, token: string): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.deletePack(packId, token);
        setItemToLS('token', data.token);
        await dispatch(getPacks(data.token))
    } catch (e) {
        setItemToLS('token', e.response.data.token);
        dispatch(setMessageText(e.response.data.error));
    } finally {
        dispatch(isLoading(false));
    }
};