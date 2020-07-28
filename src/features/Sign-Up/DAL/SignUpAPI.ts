import axios from "axios";

// export const baseURL = 'https://cards-nya-back.herokuapp.com/1.0/';

export const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
    baseURL: 'http://localhost:7542/1.0/'
});

export type SignUpType =  {
    success: boolean
    error: string
}

export const SignUpAPI = {
    SignUpAPI: async (email: string, password: string) => {
        const response = await instance.post<SignUpType>('/auth/register', {email, password});
        return response.data;
    }

};