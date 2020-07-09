import React from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../main/BLL/store';
import {UserDataType} from '../Sign-In/types/ResponseSuccessTypes';
import {Redirect} from 'react-router-dom';
import {SIGN_IN_PATH} from '../../main/UI/Routes/Routes';

export const Profile = () => {
    const userData = useSelector<AppStateType, UserDataType | null>(state => state.signIn.userData);
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);

    if (!isAuth) return <Redirect to={SIGN_IN_PATH}/>;

    return (
        <div>
            <h1>Profile </h1>
            <div><b>created:</b> {userData?.created}</div>
            <div><b>email:</b> {userData?.email}</div>
            <div><b>isAdmin:</b> {String(userData?.isAdmin)}</div>
            <div><b>name:</b> {userData?.name}</div>
            <div><b>publicCardPacksCount:</b> {userData?.publicCardPacksCount}</div>
            <div><b>rememberMe:</b> {String(userData?.rememberMe)}</div>
            <div><b>success:</b> {String(userData?.success)}</div>
            <div><b>token:</b> {userData?.token}</div>
            <div><b>tokenDeathTime:</b> {userData?.tokenDeathTime}</div>
            <div><b>updated:</b> {userData?.updated}</div>
            <div><b>verified:</b> {String(userData?.verified)}</div>
            <div><b>__v:</b> {userData?.__v}</div>
            <div><b>_id:</b> {userData?._id}</div>
        </div>
    )
};