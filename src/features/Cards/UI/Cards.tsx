import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Table} from '../../../main/UI/common/Table/Table';
import Loading from '../../../main/UI/common/LoadingToggle/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../main/BLL/store';
import {getItemFromLS} from '../../Sign-In/LS-service/localStorage';
import {MessageModal} from '../../../main/UI/common/Modal Windows/MessageModal/MessageModal';
import {setMessageText} from '../../../main/BLL/appReducer';
import {Redirect, useParams} from 'react-router-dom';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import {
    addCard,
    getCards,
    changeCard,
    deleteCard,
    setCards,
    setPage,
    setCardQuestion,
    setCardAnswer
} from '../BLL/cardsReducer';
import {CardItemType} from '../types';
import {AddCardModal} from './AddCardModal/AddCardModal';
import {ChangeCardModal} from './ChangeCardModal/ChangeCardModal';
import {DeleteItemModal} from '../../../main/UI/common/Modal Windows/DeleteItemModal/DeleteCardModal';
import PaginationRounded from "../../../main/UI/common/Paginator/Pagination";
import {getPacks, getPacksForSearch, setPackName, SetPage} from "../../Packs/BLL/packsReducer";
import {Search} from "../../../main/UI/common/Search/Search";

type CardsPropsType = {
    state: { cardCreatorId: string | undefined }
}

export const Cards = function (props: CardsPropsType) {
    const headers = ['Question', 'Answer', 'Grade', 'Add Card'];
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [modalType, setModalType] = useState<string>('');
    const [currentCardId, setCurrentCardId] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [currentAnswer, setCurrentAnswer] = useState<string>('');
    // const token = getItemFromLS('token');
    const cardCreatorId = props.state.cardCreatorId;

    const isLoading = useSelector<AppStateType, boolean>(state => state.signUp.isLoading);
    const cards = useSelector<AppStateType, Array<CardItemType>>(state => state.cards.cards);
    const messageText = useSelector<AppStateType, string>(state => state.app.message);
    const ownerId = useSelector<AppStateType, string | undefined>(state => state.signIn.userData?._id);

    const cardsTotalCount = useSelector<AppStateType, number>(s => s.cards.cardsTotalCount);
    const pageSize = useSelector<AppStateType, number>(s => s.cards.pageCount); // Кол-во элементов на странице(РАЗМЕР)
    const pagesCount = Math.ceil(cardsTotalCount / pageSize); // Кол-во страниц
    let currentPage = useSelector<AppStateType, number>(s => s.cards.page); // Текущая страница

    // Search ---------------------------------------------
    // Поисковый запрос / снятие значения с инпута
    const [searchQuery, setSearchQuery] = useState<string>('');
    const setQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value)
    };

    // Сброс результатов поиска
    const toReset = () => {
        dispatch(setCardQuestion(''));
        dispatch(setCardAnswer(''));
    };

    const toSearch = () => {
        const token = getItemFromLS('token');
        if(token){
            dispatch(getCards(token, packId, '', searchQuery)); // Сетаем новый массив
        }
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            toSearch();
        }
    };
    // End search =========================================
    //
    // useEffect( () => {
    //    dispatch(getCards('', packId));
    // }, [currentPage]);

    const {packId} = useParams();
    const dispatch = useDispatch();



    useEffect(() => {
        if (packId && currentPage) {
            dispatch(getCards('', packId));
            // setFirstRendering(false);
        }
    }, [packId, currentPage]);

    const showModal = useCallback((modalType: string, cardId?: string, creatorId?: string, question?: string, answer?: string) => {
        if (cardCreatorId && cardCreatorId !== ownerId) {
            dispatch(setMessageText('This not your Card'))
        } else {
            setModalType(modalType);
            cardId && setCurrentCardId(cardId);
            question && setCurrentQuestion(question);
            answer && setCurrentAnswer(answer);
        }
    }, [setModalType, setCurrentCardId, setCurrentAnswer, setCurrentQuestion, ownerId, dispatch, cardCreatorId]);

    const onGetCards = useCallback((sortParams: string) => {
       dispatch(getCards('', packId, `sortCards=${sortParams}`))
    }, [dispatch, packId]);

    const onChangeCard = useCallback((question: string, answer: string) => {
      dispatch(changeCard(currentCardId, '', question, answer));
    }, [ currentCardId]);

    const onAddCard = useCallback((question: string, answer: string) => {
         dispatch(addCard('', packId, question, answer))
    }, [packId]);

    const onDeleteCard = useCallback(() => {
        dispatch(deleteCard(currentCardId, ''))
    }, [ currentCardId]);

    const hideModal = useCallback(() => {
        setModalType('');
    }, []);


    if (isLoading) return <Loading/>;
    // if (!token) return <Redirect to={SIGN_IN_PATH}/>;

    //Pagination -------------------------------------------
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value))
    };
    //End pagination ============================================

    return <>
        <Table columnsHeaders={headers} rows={cards} getItems={onGetCards}
               tableModel={'cards'} showModal={showModal}/>
        <Search setQuery={setQuery} searchQuery={searchQuery} toSearch={toSearch}
                toReset={toReset} onKeyPress={onKeyPress}/>
        <MessageModal messageText={messageText} isResponseError={true}
                      actionCreator={setMessageText('')}/>
        <AddCardModal modalType={modalType} addCard={onAddCard} hideModal={hideModal}/>
        <ChangeCardModal modalType={modalType} hideModal={hideModal} changeCard={onChangeCard}
                         currentQuestion={currentQuestion} currentAnswer={currentAnswer}/>
        <DeleteItemModal modalType={modalType} deleteItem={onDeleteCard} hideModal={hideModal}/>
        <PaginationRounded pagesCount={pagesCount} page={currentPage} handleChange={handleChange}

        />
        {isLoading && <Loading/>}
    </>
};