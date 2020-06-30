import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
});

export const forgotAPI = {
    sendEmail: async(email: string) => {
        try {
            return await instance.post('auth/forgot', {
                email: email,
                html1: "<a href='http://localhost:3000/#/reset-password/",
                html2: "'>reset-password-link</a>"
            })
                .then(res => res.data)
        } catch (err) {
            return err.response.data
        }
    }
};
