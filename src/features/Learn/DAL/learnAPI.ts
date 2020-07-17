import axios from 'axios';
import {CardItemType} from '../types';


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const learnAPI = {
    putGrade(token: string, grade: number, cardId: string) {
        return instance.put<CardItemType>(`/cards/grade`, {token: token, grade: grade, card_id: cardId})
            .then(res => res.data)
    }
};