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

    addPack (token: string | undefined) {
        return instance.post('/cards/pack', {
            cardsPack: {
                name: 'BaskoPack',
                grade: 0
            },
            token
        })
            .then(res => res.data)
    },

    updatePack (idPack: string, token: string | undefined) {
        return instance.put('/cards/pack', {
            cardsPack: {
                _id: idPack,
                name: 'changedBaskoPack'
            },
            token
        })
            .then(res => res.data)
    },

    deletePack (idPack: string, token: string | undefined) {
        return instance.delete(`/cards/pack?token=${token}&id=${idPack}`)
            .then(res => res.data)
    }
};