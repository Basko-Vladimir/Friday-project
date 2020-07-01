import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {PROFILE_PATH} from '../../../main/UI/Routes/Routes';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login, setAuthMe} from '../BLL/signInReducer';
import {AppStateType} from '../../../main/BLL/store';
import {SignIn} from './SignIn';
import {getItemFromLS} from '../LS-service/localStorage';

export const SignInContainer = () => {
    const messageText = useSelector<AppStateType, string>(state => state.signIn.message);
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRemember, setIsRemember] = useState<boolean>(false);


    useEffect( () => {
        const token = getItemFromLS('token');
        token && dispatch(setAuthMe(token));
    },[dispatch]);

    const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [setEmail]);

    const changePass = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword]);

    const changeIsRemember = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setIsRemember(e.currentTarget.checked)
    }, [setIsRemember]);

    const sendFormData = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(email, password, isRemember));
        setEmail('');
        setPassword('');
        setIsRemember(false);
    }, [dispatch, email, password, isRemember]);

    if (isAuth) return <Redirect to={PROFILE_PATH}/>;

    return <SignIn email={email} password={password} isRemember={isRemember}
                   changeEmail={changeEmail} changePass={changePass} messageText={messageText}
                   changeIsRemember={changeIsRemember} sendFormData={sendFormData}/>
};

