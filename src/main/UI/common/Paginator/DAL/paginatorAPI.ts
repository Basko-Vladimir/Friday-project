import axios from 'axios';
import {CardsType} from "../../../../../features/Learn/types";


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
    baseURL: 'http://localhost:7542/1.0/'
});

export const paginatorAPI = {
    getCards(token: string, packId: string, pageCount: number = 20) {
        return instance.get<CardsType>(`/cards/card?token=${token}&cardsPack_id=${packId}&pageCount=${pageCount}`)
            .then(res => res.data)
    }
};