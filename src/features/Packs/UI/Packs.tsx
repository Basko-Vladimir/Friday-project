import React, {useCallback, useEffect, useState} from 'react';
import {Table} from '../../../main/UI/common/Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {getItemFromLS} from '../../Sign-In/LS-service/localStorage';
import {addPack, changePack, deletePack, getPacks} from '../BLL/packsReducer';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import {Redirect} from 'react-router-dom';
import {PackItemType} from '../types';
import {Message} from '../../../main/UI/common/Message/Message';
import {setMessageText} from '../../../main/BLL/appReducer';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {isLoading} from '../../Sign-Up/BLL/SignUpReducer';

export const Packs = function () {
    const headers = ['Title', 'Crade', 'Add Pack'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);
    const dispatch = useDispatch();
    const packs = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);
    const token = getItemFromLS('token');
    const messageText = useSelector<AppStateType, string>(state => state.app.message);

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

    return <>
        <Table columnsHeaders={headers} rows={packs}
               deleteItem={onDeletePack} addItem={onAddPack}
               updateItem={onUpdatePack} />
        {isLoading && <Loading/>}
        {
            messageText && <Message messageText={messageText} isResponseError={true}
                                    actionCreator={setMessageText('')}/>
        }
    </>
};