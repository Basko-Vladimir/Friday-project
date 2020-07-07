import axios from 'axios';
import {CardsType, DeletedCardType, NewCardType, UpdatedCardType} from '../types';


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const cardsAPI = {
    getCards (token: string, packId :string) {
        return instance.get<CardsType>(`/cards/card?token=${token}&cardsPack_id=${packId}`)
            .then(res => res.data)
    },

    addCard(token: string, packId:string) {
        return instance.post<NewCardType>('/cards/card', {
            card: {
                cardsPack_id: packId,
                question: 'No question Basko',
                answer: 'No answer Basko',
                grade: 0
            },
            token
        })
            .then(res => res.data)
    },

    updateCard (cardId: string, token: string) {
        return instance.put<UpdatedCardType>('/cards/card', {
            card: {
                _id: cardId,
                question: 'Changed question Basko',
                answer: 'Changed answer Basko',
                grade: 0
            },
            token
        })
            .then(res => res.data)
    },

    deleteCard (cardId: string, token: string) {
        return instance.delete<DeletedCardType>(`/cards/card?token=${token}&id=${cardId}`)
            .then(res => res.data)
    }
};