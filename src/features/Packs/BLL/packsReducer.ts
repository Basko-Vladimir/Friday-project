import {Dispatch} from 'redux';
import {packsAPI} from '../DAL/api';
import {PackItemType} from '../types';
import {setItemToLS} from '../../Sign-In/LS-service/localStorage';
import {setMessageText, SetMessageTextType} from '../../../main/BLL/appReducer';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';
import {IsLoadingACType} from '../../Sign-Up/BLL/SignUpTypes';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../../../main/BLL/store';

const SET_PACKS = 'cards/packsReducer/SET_PACKS';
const ADD_NEW_PACK = 'cards/packsReducer/ADD_NEW_PACK';
const UPDATE_PACK = 'cards/packsReducer/UPDATE_PACK';
const DELETE_PACK = 'cards/packsReducer/DELETE_PACK';

const initialState = {
    packs: [] as Array<PackItemType>
};

type StateType = typeof initialState;
type ActionsType = SetPacksType | AddPackType | UpdatePackType |
        DeletePackACType | SetMessageTextType | IsLoadingACType;

export const packsReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_PACKS:
            return {
                ...state,
                packs: action.packs
            };
        case ADD_NEW_PACK:
            return {
                ...state,
                packs: [action.newPack, ...state.packs]
            };
        case UPDATE_PACK:
            return {
                ...state,
              packs: state.packs.map( p => {

               return   (p._id === action.idPack) ? {...p, ...action.newPack } : p
              } )
            };
        case DELETE_PACK:
            return {
                ...state,
                packs: state.packs.filter( p => p._id !== action.idPack)
            };
        default:
            return state;
    }
};

type SetPacksType = ReturnType<typeof setPacks>
const setPacks = (packs: Array<PackItemType>) => ({type:SET_PACKS, packs} as const);

type AddPackType = ReturnType<typeof addNewPack>
const addNewPack =(newPack: PackItemType) => ({type: ADD_NEW_PACK, newPack} as const);

type UpdatePackType = ReturnType<typeof updatePackAC>;
const updatePackAC = (idPack: string, newPack: PackItemType) => ({type: UPDATE_PACK, idPack, newPack} as const);

type DeletePackACType = ReturnType<typeof deletePackAC>;
const deletePackAC = (idPack: string) => ({type: DELETE_PACK, idPack} as const);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getPacks = (token: string) =>  async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(isLoading(true));
        const data = await packsAPI.getPacks(token);
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
        debugger
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