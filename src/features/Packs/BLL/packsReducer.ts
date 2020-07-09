import {Dispatch} from 'redux';
import {packsAPI} from '../DAL/packsAPI';
import {PackItemType} from '../types';
import {setItemToLS} from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../../../main/BLL/store';

const SET_PACKS = 'cards/packsReducer/SET_PACKS';
const UPDATE_PACK = 'cards/packsReducer/UPDATE_PACK';

const initialState = {
    packs: [] as Array<PackItemType>
};

type StateType = typeof initialState;
type ActionsType = SetPacksType | UpdatePackType | SetMessageTextType | IsLoadingACType;

export const packsReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_PACKS:
            return {
                ...state,
                packs: action.packs
            };
        case UPDATE_PACK:
            return {
                ...state,
              packs: state.packs.map( p => p._id === action.idPack ? {...p, ...action.newPack } : p)
            };
        default:
            return state;
    }
};

type SetPacksType = ReturnType<typeof setPacks>
export const setPacks = (packs: Array<PackItemType>) => ({type:SET_PACKS, packs} as const);

type UpdatePackType = ReturnType<typeof updatePackAC>;
const updatePackAC = (idPack: string, newPack: PackItemType) => ({type: UPDATE_PACK, idPack, newPack} as const);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getPacks = (token: string, sortParams?: string) =>  async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.getPacks(token, sortParams);
        setItemToLS('token', data.token);
        dispatch(setPacks(data.cardPacks));
    } catch (e) {
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const addPack = (token: string | undefined): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.addPack(token);
        await dispatch(getPacks(data.token));
    } catch (e) {

        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }

};

export const changePack = (idPack: string, token: string | undefined) => async (dispatch: Dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.updatePack(idPack, token);
        setItemToLS('token', data.token);
        dispatch(updatePackAC(idPack, data.updatedCardsPack));
    } catch(e){
        setItemToLS('token', e.response.data.token);
        dispatch(setMessageText(e.response.data.error))
    } finally {
        dispatch(isLoading(false));
    }
};

export const deletePack = (idPack: string, token: string | undefined): ThunkType => async (dispatch) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.deletePack(idPack, token);
        setItemToLS('token', data.token);
        await dispatch(getPacks(data.token))
    } catch (e) {
        setItemToLS('token', e.response.data.token);
        dispatch(setMessageText(e.response.data.error));
    } finally {
        dispatch(isLoading(false));
    }
};