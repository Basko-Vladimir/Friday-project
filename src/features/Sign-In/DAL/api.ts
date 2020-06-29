import axios from 'axios';
import {UserDataType} from '../types/types';

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const authAPI = {
    login: async (email: string, password: string, rememberMe: boolean = false ) => {
        try {
            return await instance.post<UserDataType>('/auth/login', {email, password, rememberMe})
        } catch (err) {
            return err.response;
        }
    },

    authMe: async (token: string) => {
        try {
            return await instance.post<UserDataType>('/auth/me', {token})
        } catch (err) {
            return err.response;
        }
    }
};

