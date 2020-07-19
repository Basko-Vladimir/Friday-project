import axios from 'axios';
import {CardsType} from "../types";


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const learnAPI = {
    getCards(token: string, packId: string, sortParams: string = '') {
        return instance.get<CardsType>(`/cards/card?token=${token}&cardsPack_id=${packId}&${sortParams}`)
            .then(res => res.data)
    },
    putGrade(token: string, grade: number, cardId: string) {
        return instance.put<CardsType>(`/cards/grade`, {token: token, grade: grade, card_id: cardId})
            .then(res => res.data)
    }
};