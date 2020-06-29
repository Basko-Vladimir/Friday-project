import React, {ChangeEvent, FormEvent, useState} from 'react';
import {PROFILE_PATH} from '../../../main/UI/Routes/Routes';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../BLL/signInReducer';
import {AppStateType} from '../../../main/BLL/store';
import {SignIn} from './SignIn';

export const SignInContainer = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);
    const errorText = useSelector<AppStateType, string>(state => state.signIn.errorMessage);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setSetIsRemember] = useState(false);

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };

    const changePass = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    };

    const changeIsRemember = (e: ChangeEvent<HTMLInputElement>) => {
        setSetIsRemember(e.currentTarget.checked)
    };

    const sendFormData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(email, password, isRemember));
    };

    return (
        <>
            {
                !isAuth
                    ? <SignIn email={email} password={password} isRemember={isRemember}
                              changeEmail={changeEmail} changePass={changePass} errorText={errorText}
                              changeIsRemember={changeIsRemember} sendFormData={sendFormData}/>
                    : <Redirect to={PROFILE_PATH}/>
            }
        </>
    )
};

