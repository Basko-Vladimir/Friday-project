import React, {useCallback, useEffect, useState} from 'react';
import {Table} from '../../../main/UI/common/Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {getItemFromLS} from '../../Sign-In/LS-service/localStorage';
import {addPack, changePack, deletePack, getPacks} from '../BLL/packsReducer';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import {Redirect} from 'react-router-dom';
import {PackItemType} from '../types';
import {SearchContainer} from "../../../main/UI/common/Search/Search";
import {Message} from '../../../main/UI/common/Message/Message';
import {setMessageText} from '../../../main/BLL/appReducer';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {PaginatorContainer} from "../../../main/UI/common/Paginator/Paginator";

export const Packs = function () {
    const headers = ['Title', 'Crade', 'Add Pack'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const token = getItemFromLS('token');

    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);
    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const packs = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);
    const messageText = useSelector<AppStateType, string>(state => state.app.message);

    const dispatch = useDispatch();

    useEffect(() => {
        if (firstRendering && token && isAuth) {
            setFirstRendering(false);
            dispatch(getPacks(token));
        }
    }, [dispatch, token, setFirstRendering, firstRendering, isAuth]);

    const onUpdatePack = useCallback((idPack: string) => {
        dispatch(changePack(idPack, token));
    }, [dispatch, token]);

    const onAddPack = useCallback( ()  => {
        dispatch(addPack(token))
    }, [dispatch, token]);

    const onDeletePack = useCallback((idPack: string) => {
        dispatch(deletePack(idPack, token))
    },[dispatch, token]);

    if (!isAuth) return <Redirect to={SIGN_IN_PATH}/>;


    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SearchContainer/>
        <Table columnsHeaders={headers} rows={packs}
               deleteItem={onDeletePack} addItem={onAddPack}
               updateItem={onUpdatePack} tableModel={'packs'}/>
        {isLoading && <Loading/>}
        {
            messageText && <Message messageText={messageText} isResponseError={true}
                                    actionCreator={setMessageText('')}/>
        }
        <PaginatorContainer />
        </div>

};