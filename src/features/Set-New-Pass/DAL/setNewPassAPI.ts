import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});


export const setNewPassAPI = {
    setNewPass (password: string, resetPasswordToken: string = '') {
        return instance.post<{success: boolean}>('/auth/set-new-password', {password, resetPasswordToken})
            .then(res => res.data)
    }
};