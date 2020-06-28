import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const authAPI = {
    signIn(email: string, password: string, isRemember: boolean = false ) {
        return instanse.post('/auth/login', {email, password, isRemember})
    }
};

