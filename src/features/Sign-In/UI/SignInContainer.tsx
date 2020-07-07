import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {PROFILE_PATH} from '../../../main/UI/Routes/Routes';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login, setAuthMe} from '../BLL/signInReducer';
import {AppStateType} from '../../../main/BLL/store';
import {SignIn} from './SignIn';
import {getItemFromLS} from '../LS-service/localStorage';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';

export const SignInContainer = () => {
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);
    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const token = getItemFromLS('token');

    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRemember, setIsRemember] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token && firstRendering && !isAuth) {
            dispatch(setAuthMe(token));
            setFirstRendering(false)
        }
    }, [dispatch, token, setFirstRendering, firstRendering, isAuth]);

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

    return <>
        <SignIn email={email} password={password} isRemember={isRemember}
                changeEmail={changeEmail} changePass={changePass} messageText={messageText}
                changeIsRemember={changeIsRemember} sendFormData={sendFormData}/>
        {isLoading && <Loading/>}
    </>
};

