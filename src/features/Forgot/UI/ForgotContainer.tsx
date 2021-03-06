import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {Forgot} from './Forgot';
import {useDispatch, useSelector} from 'react-redux';
import {sendEmail} from '../BLL/forgotReducer';
import {AppStateType} from '../../../main/BLL/store';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';

export const ForgotContainer = () => {
    const [email, setEmail] = useState<string>('');
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const forgotSuccess = useSelector<AppStateType, boolean>(state => state.forgot.forgotSuccess);
    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const dispatch = useDispatch();

    const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [setEmail]);

    const onSendEmail = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendEmail(email));
        setEmail('');
    }, [dispatch, email]);

    return <>
        <Forgot email={email} changeEmail={changeEmail} isResponseError={!forgotSuccess}
                messageText={messageText} sendEmail={onSendEmail}/>
        {isLoading && <Loading/>}
    </>
};