import axios from 'axios';
import {UserDataType} from '../types/ResponseSuccessTypes';


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});


export const authAPI = {
    login: async (email: string, password: string, rememberMe: boolean = false ) => {
        try {
            return await instance.post('/auth/login', {email, password, rememberMe})
                .then(res => res.data)
        } catch (err) {
            return err.response.data
        }
    },

    authMe: async (token: string) => {
        try {
            return await instance.post<UserDataType>('/auth/me', {token})
                .then(res => res.data)
        } catch (err) {
            return err.response.data;
        }
    }
};
