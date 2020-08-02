import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Table} from '../../../main/UI/common/Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {getItemFromLS} from '../../Sign-In/LS-service/localStorage';
import {addPack, changePack, deletePack, getPacks, getPacksForSearch, setPackName, SetPage} from '../BLL/packsReducer';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import {Redirect} from 'react-router-dom';
import {PackItemType} from '../types';
import {Search} from "../../../main/UI/common/Search/Search";
import {MessageModal} from '../../../main/UI/common/Modal Windows/MessageModal/MessageModal';
import {setMessageText} from '../../../main/BLL/appReducer';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {AddPackModal} from './AddPackModal/AddPackModal';
import {ChangePackModal} from './ChangePackModal/ChangePackModal';
import {DeleteItemModal} from '../../../main/UI/common/Modal Windows/DeleteItemModal/DeleteCardModal';
import PaginationRounded from "../../../main/UI/common/Paginator/Pagination";

export const Packs = function () {
    const headers = ['Name', 'Grade', 'Add Pack'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [currentPackId, setCurrentPackId] = useState<string>('');
    const [currentPackName, setCurrentPackName] = useState<string>('');
    const [modalType, setModalType] = useState<string>('');


    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const packs = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const ownerId = useSelector<AppStateType, string | undefined>(state => state.signIn.userData?._id);
    let currentPage = useSelector<AppStateType, number>(s => s.packs.page); // Текущая страница
    const dispatch = useDispatch();

    useEffect(() => {
        let token = getItemFromLS('token');
        if (currentPage) {
            dispatch(getPacks(token));
            // setFirstRendering(false);
        }

    }, [currentPage]);

    // Данные
    const pageSize = useSelector<AppStateType, number>(s => s.packs.pageCount); // Кол-во элементов на странице(РАЗМЕР)
    const cardPacksTotalCount = useSelector<any, number>(s => s.packs.cardPacksTotalCount);  //Кол-во колод
    const pagesCount = Math.ceil(cardPacksTotalCount / pageSize); // Кол-во страниц

    //
    // useEffect( () => {
    //     let token = getItemFromLS('token');
    //    token && dispatch(getPacks(token));
    // }, [currentPage]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

        dispatch(SetPage(value))
    };
    //end

    // Search features ---------------------------------------
    // Поисковый запрос / снятие значения с инпута
    const [searchQuery, setSearchQuery] = useState('');
    const setQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value)
    };

    // Сброс результатов поиска
    const toReset = () => {
        dispatch(setPackName(''))
    };

    const toSearch = () => {
        dispatch(getPacksForSearch(searchQuery)); // Сетаем новый массив
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            toSearch();
        }
    };
    // End search --------------------------------------------

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
        dispatch(getPacks('', `sortPacks=${sortParams}`));
    }, []);

    const onChangePack = useCallback((newName: string) => {
        dispatch(changePack(currentPackId, '', newName));
    }, [currentPackId]);

    const onAddPack = useCallback((title: string) => {
        dispatch(addPack('', title));
    }, [dispatch]);

    const onDeletePack = useCallback(() => {
        dispatch(deletePack(currentPackId, ''));
    }, [currentPackId]);


    if (isLoading) return <Loading/>;
    // if (!token) return <Redirect to={SIGN_IN_PATH}/>;


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Search setQuery={setQuery} searchQuery={searchQuery} toSearch={toSearch}
                    toReset={toReset} onKeyPress={onKeyPress}/>
            <Table columnsHeaders={headers} rows={packs} getItems={onGetPacks}
                   tableModel={'packs'} showModal={showModal}/>
            <PaginationRounded pagesCount={pagesCount} page={currentPage} handleChange={handleChange}/>
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