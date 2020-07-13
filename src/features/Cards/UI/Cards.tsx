import React, {useCallback, useEffect, useState} from 'react';
import { Table } from '../../../main/UI/common/Table/Table';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {getItemFromLS} from '../../Sign-In/LS-service/localStorage';
import {MessageModal} from '../../../main/UI/common/MessageModal/MessageModal';
import {setMessageText} from '../../../main/BLL/appReducer';
import {Redirect, useParams} from 'react-router-dom';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import {addCard, getCards, changeCard, deleteCard} from '../BLL/cardsReducer';
import {CardItemType} from '../types';

export const Cards = function () {
    const headers = ['Question', 'Answer', 'Grade', 'Add Pack'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const token = getItemFromLS('token');

    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);
    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const cards = useSelector<AppStateType, Array<CardItemType>>(state => state.cards.cards);
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const {packId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (firstRendering && token && isAuth) {
            setFirstRendering(false);
            dispatch(getCards(token, packId));
        }
    }, [dispatch, token, setFirstRendering, firstRendering, isAuth, packId]);

    const onGetCards = useCallback( (sortParams: string) => {
        token && dispatch(getCards(token, packId, `sortCards=${sortParams}`))
    }, [dispatch, token, packId]);

    const onUpdatePack = useCallback((cardId: string) => {
        token && dispatch(changeCard(cardId, token));
    }, [dispatch, token]);

    const onAddPack = useCallback( ()  => {
       token && dispatch(addCard(token, packId,))
    }, [dispatch, token, packId]);

    const onDeletePack = useCallback((cardId: string) => {
        token && dispatch(deleteCard(cardId, token))
    },[dispatch, token]);

    if (!isAuth) return <Redirect to={SIGN_IN_PATH}/>;

    return <>
        <Table columnsHeaders={headers} rows={cards} getItems={onGetCards}
               deleteItem={onDeletePack} addItem={onAddPack}
               updateItem={onUpdatePack} tableModel={'cards'}/>
        {isLoading && <Loading/>}
        {
            messageText && <MessageModal messageText={messageText} isResponseError={true}
                                    actionCreator={setMessageText('')}/>
        }
    </>
};