import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {Forgot} from './Forgot';
import {useDispatch, useSelector} from 'react-redux';
import {sendEmail} from '../BLL/forgotReducer';
import {AppStateType} from '../../../main/BLL/store';
import {SET_NEW_PASS_PATH} from '../../../main/UI/Routes/Routes';
import { Redirect } from 'react-router-dom';

export const ForgotContainer = () => {
    const [email, setEmail] = useState('');
    const errorText = useSelector<AppStateType, string>(state => state.signIn.errorMessage);
    const forgotSuccess = useSelector<AppStateType, boolean>(state => state.forgot.forgotSuccess);
    const dispatch = useDispatch();

    const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [setEmail]);

    const onSendEmail = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendEmail(email));
    }, [dispatch, email]);

    return (
        <>
            {
                forgotSuccess
                ? <Redirect to={SET_NEW_PASS_PATH}/>
                : <Forgot email={email} changeEmail={changeEmail}
                        errorText={errorText} sendEmail={onSendEmail}/>
            }
        </>
    )
};