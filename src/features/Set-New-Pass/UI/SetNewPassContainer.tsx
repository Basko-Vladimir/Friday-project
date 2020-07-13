import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {SetNewPass} from './SetNewPass';
import {useParams, Redirect} from 'react-router-dom';
import {setNewPassword} from '../BLL/setNewPassReducer';
import {setMessageText} from '../../../main/BLL/appReducer';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';

export const SetNewPassContainer = () => {
    const [password, setPassword] = useState<string>('');
    const [redirect, setRedirect] = useState<boolean>(false);
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const newPassSuccess = useSelector<AppStateType, boolean>(state => state.setNewPass.newPassSuccess);
    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const dispatch = useDispatch();
    const {resetToken} = useParams();


    const changePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword]);

    const changePasswordRepeat = useCallback((value: string) => {
        setPasswordRepeat(value)
    }, [setPasswordRepeat]);

    const sendNewPassword = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === passwordRepeat) {
            dispatch(setNewPassword(password, resetToken))
        } else {
            dispatch(setMessageText('Passwords doesn\'t match'))
        }
        setPassword('');
        setPasswordRepeat('');
    }, [dispatch, password, passwordRepeat, resetToken]);

    if (newPassSuccess) setTimeout(() => {
        setRedirect(true)
    }, 2000);

    if (redirect) return <Redirect to={SIGN_IN_PATH}/>;

    return <>
        <SetNewPass password={password} passwordRepeat={passwordRepeat}
                    sendNewPassword={sendNewPassword} changePassword={changePassword}
                    changePasswordRepeat={changePasswordRepeat} messageText={messageText}
                    isResponseError={!newPassSuccess}/>
        {isLoading && <Loading/>}
    </>
};





