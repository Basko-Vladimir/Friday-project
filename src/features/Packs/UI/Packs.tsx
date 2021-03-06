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
import {MessageModal} from '../../../main/UI/common/Modal Windows/MessageModal/MessageModal';
import {setMessageText} from '../../../main/BLL/appReducer';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {PaginatorContainer} from "../../../main/UI/common/Paginator/Paginator";
import {AddPackModal} from './AddPackModal/AddPackModal';
import {ChangePackModal} from './ChangePackModal/ChangePackModal';
import {DeleteItemModal} from '../../../main/UI/common/Modal Windows/DeleteItemModal/DeleteCardModal';

export const Packs = function () {
    const headers = ['Name', 'Grade', 'Add Pack'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [currentPackId, setCurrentPackId] = useState<string>('');
    const [currentPackName, setCurrentPackName] = useState<string>('');
    const [modalType, setModalType] = useState<string>('');
    let token = getItemFromLS('token');

    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const packs = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const ownerId = useSelector<AppStateType, string | undefined>(state => state.signIn.userData?._id);
    const dispatch = useDispatch();

    useEffect(() => {
        if (firstRendering && token) {
            dispatch(getPacks(token));
            setFirstRendering(false);
        }

    }, [dispatch, token, setFirstRendering, firstRendering]);

    const showModal = useCallback((modalType: string, packId?: string, creatorId?: string, packName?: string) => {
        if ((modalType === 'delete' || modalType === 'change') && creatorId !== ownerId) {
            dispatch(setMessageText('This not your Pack'))
        } else {
            packId && setCurrentPackId(packId);
            packName && setCurrentPackName(packName);
            setModalType(modalType);
        }
    }, [setCurrentPackId, setCurrentPackName, setModalType, ownerId, dispatch]);

    const hideModal = useCallback(() => {
        setModalType('');
    }, [setModalType]);

    const onGetPacks = useCallback((sortParams: string) => {
        token && dispatch(getPacks(token, `sortPacks=${sortParams}`));
    }, [dispatch, token]);

    const onChangePack = useCallback((newName: string) => {
        token && dispatch(changePack(currentPackId, token, newName));
    }, [dispatch, token, currentPackId]);

    const onAddPack = useCallback((title: string) => {
        token && dispatch(addPack(token, title));
    }, [dispatch, token]);

    const onDeletePack = useCallback(() => {
        token && dispatch(deletePack(currentPackId, token));
    }, [dispatch, token, currentPackId]);


    if (isLoading) return <Loading/>;
    if (!token) return <Redirect to={SIGN_IN_PATH}/>;

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SearchContainer/>
            <Table columnsHeaders={headers} rows={packs} getItems={onGetPacks}
                   tableModel={'packs'} showModal={showModal}/>
            <PaginatorContainer/>
            <MessageModal messageText={messageText} isResponseError={true}
                          actionCreator={setMessageText('')}/>
            <AddPackModal modalType={modalType} addPack={onAddPack}
                          hideModal={hideModal}/>
            <ChangePackModal modalType={modalType} onChangePack={onChangePack}
                             hideModal={hideModal} currentPackName={currentPackName}/>
            <DeleteItemModal modalType={modalType} deleteItem={onDeletePack} hideModal={hideModal}/>
            {isLoading && <Loading/>}
        </div>
    )
};