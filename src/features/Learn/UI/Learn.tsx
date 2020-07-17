import React, {DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useState} from 'react';
import s from './Learn.module.scss'
import {Button} from "../../../main/UI/common/Button/Button";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../main/BLL/store";
import {CardItemType} from "../../Cards/types";
import {getCards} from "../../Cards/BLL/cardsReducer";
import {getItemFromLS} from "../../Sign-In/LS-service/localStorage";
import {setNewGrade} from "../BLL/learnReducer";


type LearnType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement> &
    {
        show: boolean, setShow: (show: boolean) => void, cards: Array<CardItemType>, currentCard: number,
        doAnswer: (grade: number) => void, isClicked: boolean, clickedStyle: any
    }

const Learn: React.FC<LearnType> =  ({
                                         show, setShow, cards, currentCard, doAnswer,
                                         isClicked, clickedStyle
}) => {


    return <div className={s.container}>
        <div className={s.visible}>
            <h2>Learning Page</h2>
            <p>{cards[currentCard].question}</p>
            <Button title='check' onClick={() => {setShow(!show)}}/>
        </div>
        {   show &&
            <div className={s.hidden}>
            <p>{cards[currentCard].answer}</p>
            <div className={s.body}>
                <div className={s.answers}>
                    <span onClick={() => {doAnswer(1)}}>Не знал.</span>
                    <span onClick={() => {doAnswer(2)}}>Что-то слышал про это...</span>
                    <span onClick={() => {doAnswer(3)}}>Угадал</span>
                    <span onClick={() => {doAnswer(4)}}>Почти знал</span>
                    <span onClick={() => {doAnswer(5)}}>Знал на 100%</span>
                </div>
                <div className={s.nextBtnContainer}>
                    <Button title='Next >>>'/>
                </div>

            </div>
        </div>
        }
    </div>
};

export const LearnContainer = () => {
    const dispatch = useDispatch();

    // Достаём из параметров NavLink параметр id (передали его в Table, в NavLink-е)
    const params = useParams<{id:string}>();

    // Показать/спрятать ответ
    const [show, setShow] = useState<boolean>(false);

    // Достали токен
    const token = getItemFromLS('token') as string;

    const [firstRender, setFirstRender] = useState(true);
    // Запрос за карточками
    useEffect(() => {
        if (firstRender) {
            dispatch(getCards(token, params.id));
            setFirstRender(false)
        }
        }, [dispatch, token, params.id, firstRender, setFirstRender]
    );

    // Текущий индекс массива(какая карточка отображается)
    const currentCard = 0 as number;

    // Достаём запрошенные карточки из редюсера
    const cards = useSelector<AppStateType, Array<CardItemType>>(s => s.cards.cards);

    // Достаём id карточки. Делаем проверку, чтобы длинна массива не была равна нулю, чтобы он успел прийти в редакс.
    const cardId = cards.length !== 0 ? cards[currentCard]._id: '';

    // Коллбэк на оценку карточки
    const doAnswer = useCallback((grade: number) => {
        // const token = getItemFromLS('token') as string;
        dispatch(setNewGrade(token, grade, cardId));
        setIsClicked(true)
    }, [token, dispatch, cardId]);

    const [isClicked, setIsClicked] = useState(false);
    const clickedStyle = {backgroundColor: 'darksalmon'};

    return cards.length  ? <Learn show={show} setShow={setShow} cards={cards} currentCard={currentCard}
                                  doAnswer={doAnswer} isClicked={isClicked} clickedStyle={clickedStyle}
    /> : <></>
};