import {Dispatch} from 'redux';
import {packsAPI} from '../DAL/api';
import {PackItemType} from '../types';
import {setItemToLS} from '../../Sign-In/LS-service/localStorage';

const SET_PACKS = 'cards/packsReducer/SET_PACKS';

const initialState = {
    packs: [] as Array<PackItemType>
};

type StateType = typeof initialState;
type ActionsType = SetPacksType;

export const packsReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_PACKS:
            return {
                ...state,
                packs: action.packs
            };
        default:
            return state;
    }
};

type SetPacksType = ReturnType<typeof setPacks>
const setPacks = (packs: Array<PackItemType>) => ({type:SET_PACKS, packs} as const);

export const getPacks = (token: string) =>  async (dispatch: Dispatch) => {
    const data = await packsAPI.getPacks(token);
    dispatch(setPacks(data.cardPacks));
    setItemToLS('token', data.token);
};

export const updatePack = (idPack: string, token: string | undefined) => async (dispatch: Dispatch) => {
    const data = packsAPI.updatePack(idPack, token);
    console.log(data);
};

