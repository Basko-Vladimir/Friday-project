import React, {useEffect, useState} from 'react';
import {Table} from '../../../main/UI/common/Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {getItemFromLS} from '../../Sign-In/LS-service/localStorage';
import {getPacks} from '../BLL/packsReducer';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import { Redirect } from 'react-router-dom';
import {PackItemType} from '../types';
import {SearchContainer} from "../../../main/UI/common/Search/Search";

export const Packs = function () {
    const headers = ['Title', 'Crade', 'Add Pack' ];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const dispatch = useDispatch();
    const packs = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);
    const token = getItemFromLS('token');
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);

    useEffect( () => {
        if (firstRendering && token) {
            setFirstRendering(false);
            dispatch(getPacks(token));
        }
    }, [dispatch, token, setFirstRendering, firstRendering]);


    if (!token) return <Redirect to={SIGN_IN_PATH}/>;

    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SearchContainer/>
            <Table columnsHeaders={headers} rows={packs}/>
        </div>

};