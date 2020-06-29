import React from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../main/BLL/store';
import {UserDataType} from '../Sign-In/types/types';

export const Profile = () => {
    const {created, email, isAdmin, name,
            publicCardPacksCount, rememberMe,
            success, token, tokenDeathTime, updated,
            verified, __v, _id} = useSelector<AppStateType, UserDataType>(state => state.signIn.userData);

    return (
        <>
            <h1>Profile </h1>
            <div><b>created:</b> {created}</div>
            <div><b>email:</b> {email}</div>
            <div><b>isAdmin:</b> {String(isAdmin)}</div>
            <div><b>name:</b> {name}</div>
            <div><b>publicCardPacksCount:</b> {publicCardPacksCount}</div>
            <div><b>rememberMe:</b> {String(rememberMe)}</div>
            <div><b>success:</b> {String(success)}</div>
            <div><b>token:</b> {token}</div>
            <div><b>tokenDeathTime:</b> {tokenDeathTime}</div>
            <div><b>updated:</b> {updated}</div>
            <div><b>verified:</b> {String(verified)}</div>
            <div><b>__v:</b> {__v}</div>
            <div><b>_id:</b> {_id}</div>
        </>
    )
};