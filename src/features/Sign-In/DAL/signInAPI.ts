import axios from 'axios';
import {UserDataType} from '../types/ResponseSuccessTypes';

const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
    baseURL: 'http://localhost:7542/1.0/'
});


export const authAPI = {
    login (email: string, password: string, rememberMe: boolean = false ) {
        return instance.post<UserDataType>('/auth/login', {email, password, rememberMe})
            .then(res => res.data)
    },

    authMe (token: string) {
       return instance.post<UserDataType>('/auth/me', {token})
            .then(res => res.data);
    }
};
