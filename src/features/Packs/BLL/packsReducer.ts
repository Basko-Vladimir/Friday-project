import {Dispatch} from 'redux';
import {packsAPI} from '../DAL/api';
import {PackItemType} from '../types';
import {setItemToLS} from '../../Sign-In/LS-service/localStorage';

const SET_PACKS = 'cards/packsReducer/SET_PACKS';
const ADD_NEW_PACK = 'cards/packsReducer/ADD_NEW_PACK';
const UPDATE_PACK = 'cards/packsReducer/UPDATE_PACK';
const DELETE_PACK = 'cards/packsReducer/DELETE_PACK';

const initialState = {
    packs: [] as Array<PackItemType>
};

type StateType = typeof initialState;
type ActionsType = SetPacksType | AddPackType | UpdatePackType | DeletePackACType;

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
export const setPacks = (packs: Array<PackItemType>) => ({type:SET_PACKS, packs} as const);

type AddPackType = ReturnType<typeof addNewPack>
const addNewPack =(newPack: PackItemType) => ({type: ADD_NEW_PACK, newPack} as const);

type UpdatePackType = ReturnType<typeof updatePack>;
const updatePack = (idPack: string, newPack: PackItemType) => ({type: UPDATE_PACK, idPack, newPack} as const);

type DeletePackACType = ReturnType<typeof deletePackAC>;
const deletePackAC = (idPack: string) => ({type: DELETE_PACK, idPack} as const);


export const getPacks = (token: string) =>  async (dispatch: Dispatch) => {

    const data = await packsAPI.getPacks(token);
    setItemToLS('token', data.token);
    dispatch(setPacks(data.cardPacks));
};

export const addPack = (token: string | undefined) => async (dispatch: any) => {
    const data = await packsAPI.addPack(token);
    setItemToLS('token', data.token);
    dispatch(getPacks(data.token));
};

export const changePack = (idPack: string, token: string | undefined) => async (dispatch: Dispatch) => {
    const data = await packsAPI.updatePack(idPack, token);
    setItemToLS('token', data.token);
    dispatch(updatePack(idPack, data.updatedCardsPack));
};

export const deletePack = (idPack: string, token: string | undefined) => async (dispatch: any) => {
    const data = await packsAPI.deletePack(idPack, token);
    setItemToLS('token', data.token);
    dispatch(getPacks(data.token));
};

