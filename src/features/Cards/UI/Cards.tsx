import React, {useCallback, useEffect, useState} from 'react';
import {Table} from '../../../main/UI/common/Table/Table';
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
import { AddCardModal } from './AddCardModal/AddCardModal';
import {ChangeCardModal} from './ChangeCardModal/ChangeCardModal';

export const Cards = function () {
    const headers = ['Question', 'Answer', 'Grade', 'Add Pack'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [modalType, setModalType] = useState<string>('');
    const [currentCardId, setCurrentCardId] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [currentAnswer, setCurrentAnswer] = useState<string>('');
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

    const showModal = useCallback((modalType: string, cardId?: string, question?: string, answer?: string) => {
        setModalType(modalType);
        cardId && setCurrentCardId(cardId);
        question && setCurrentQuestion(question);
        answer && setCurrentAnswer(answer);
    }, [setModalType, setCurrentCardId, setCurrentAnswer, setCurrentQuestion]);

    const onGetCards = useCallback((sortParams: string) => {
        token && dispatch(getCards(token, packId, `sortCards=${sortParams}`))
    }, [dispatch, token, packId]);

    const onChangeCard = useCallback((question: string, answer: string) => {
        token && dispatch(changeCard(currentCardId, token, question, answer));
    }, [dispatch, token, currentCardId]);

    const onAddCard = useCallback((question: string, answer: string) => {
        token && dispatch(addCard(token, packId, question, answer ))
    }, [dispatch, token, packId]);

    const onDeletePack = useCallback((cardId: string) => {
        token && dispatch(deleteCard(cardId, token))
    }, [dispatch, token]);

    const hideModal = useCallback( () => {
        setModalType('');
    }, []);


    if (!isAuth) return <Redirect to={SIGN_IN_PATH}/>;

    return <>
        <Table columnsHeaders={headers} rows={cards} getItems={onGetCards}
               tableModel={'cards'} showModal={showModal}/>
        <MessageModal messageText={messageText} isResponseError={true}
                      actionCreator={setMessageText('')}/>
        <AddCardModal modalType={modalType} addCard={onAddCard} hideModal={hideModal} />
        <ChangeCardModal modalType={modalType} hideModal={hideModal} changeCard={onChangeCard}
                         currentQuestion={currentQuestion} currentAnswer={currentAnswer} />

        {isLoading && <Loading/>}
    </>
};