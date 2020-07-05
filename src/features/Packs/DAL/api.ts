import axios from 'axios';
import {PacksType} from '../types';

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const packsAPI = {
    getPacks (token: string, pageCount: number = 4, page: number = 1 ) {
        return instance.get<PacksType>(`/cards/pack?token=${token}&pageCount=${pageCount}&page=${page}`)
            .then(res => res.data)
    },

    updatePack (idPack: string, token: string | undefined) {
        return instance.put('/cards/pack', { cardsPack: {_id: idPack}, token})
            .then(res => res.data)
    }
};