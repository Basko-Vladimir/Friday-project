import axios from 'axios';
import {CardsType, DeletedCardType, NewCardType, UpdatedCardType} from '../types';


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
    baseURL: 'http://localhost:7542/1.0/'
});

export const cardsAPI = {
    getCards(token: string, packId: string, sortParams: string = '', page: number, pageCount: number,
             cardQuestion: string = '', cardAnswer: string='') {
        debugger
        return instance.get<CardsType>
        (`/cards/card?token=${token}&cardsPack_id=${packId}&sortParams=${sortParams}&page=${page}&pageCount=${pageCount}&cardQuestion=${cardQuestion}&cardAnswer=${cardAnswer}`)
            .then(res => res.data)
    },

    addCard(token: string, packId: string, question: string, answer: string) {
        return instance.post<NewCardType>('/cards/card', {
            card: {cardsPack_id: packId, question, answer, grade: 0},
            token
        })
            .then(res => res.data)
    },

    updateCard(cardId: string, token: string, question: string, answer: string) {
        return instance.put<UpdatedCardType>('/cards/card', {
            card: {_id: cardId, question, answer, grade: 0},
            token
        })
            .then(res => res.data)
    },

    deleteCard(cardId: string, token: string) {
        return instance.delete<DeletedCardType>(`/cards/card?token=${token}&id=${cardId}`)
            .then(res => res.data)
    }
};