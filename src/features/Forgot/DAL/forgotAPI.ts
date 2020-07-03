import axios from 'axios';
import {ForgotSuccessType} from '../types/ResponseSuccessTypes';

const instance = axios.create({
   baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const forgotAPI = {
    sendEmail(email: string) {
        return instance.post<ForgotSuccessType>('auth/forgot', {
            email: email,
            html1: "<a href='http://localhost:3000/#/set-new-password/",
            html2: "'>reset-password-link</a>"
        })
            .then(res => res.data)
    }
};
