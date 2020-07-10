import React, {ButtonHTMLAttributes, DetailedHTMLProps, useCallback, useEffect, useState} from 'react';
import s from './Paginator.module.scss';
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {getPacksNew, SetNewPageAC} from "../../../../features/Packs/BLL/packsReducer";
import {getItemFromLS} from "../../../../features/Sign-In/LS-service/localStorage";

export type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> &
    {
        title: string, pageNumber: number, setPage: any,
        disableLeftBtn: boolean, disableRightBtn: boolean, lastPage: any,
        b4Call: () => void, b1Call: () => void, b1: string | number, b2: string | number,
        b3: string | number, b4: string | number,
        // middleBtnCall: () => void
    };

const Paginator: React.FC<ButtonPropsType> = React.memo(({
                                                             title, pageNumber, setPage,
                                                             disableLeftBtn, disableRightBtn, lastPage,
                                                             b4Call, b1Call, b1, b2, b3, b4,
                                                             // middleBtnCall,
                                                             ...props
                                                         }) => {
    return (
        <div className={s.container}>
            <h3>Pages</h3>
            <Button title={'<'} className={s.arrow} disabled={disableLeftBtn}/>
            <Button title={b1.toString()} className={s.button} onClick={b1Call}/>
            <Button title={b2.toString()} className={s.button} onClick={() => {
                setPage(0)
            }}/>
            <Button title={b3.toString()} className={s.button} onClick={() => {
                setPage(1)
            }}/>
            <Button title={b4.toString()} className={s.button} onClick={b4Call}/>
            <span>...</span>
            <Button title={lastPage || '...'} className={s.button}/>
            <Button title={'>'} className={s.arrow} disabled={disableRightBtn}/>
        </div>
    )
});
export const PaginatorContainer = () => {

    // Нужно починить:
    // 1. Дизейблы.
    // 2. Последнюю кнопку.
    // 3. После починки п.2, реализовать логику убирания-появления спана '...'

    // Значения кнопок
    const [btns, setBtns] = useState([1, 4]);
    const [btns2, setBtns2] = useState([btns[0] + 1, btns[0] + 2]);


    // Данные
    const pageSize = useSelector<AppStateType, number>(s => s.packs.pageCount); // Кол-во элементов на странице(РАЗМЕР)
    const itemsCount = useSelector<any, number>(s => s.packs.packs.length);  //Кол-во колод
    const pagesCount = Math.ceil(itemsCount / pageSize); // Кол-во страниц
    let pageNumber = useSelector<AppStateType, number>(s => s.packs.page); // Текущая страница
    let lastPage = pageNumber * pageSize;

    // Проверки на кнопку 1,4
    const [isB4, setIsB4] = useState<boolean>(false);
    const [isB1, setIsB1] = useState<boolean>(true);

    // Блокировка кнопок <>
    const [disableLeftBtn, setDisableLeftBtn] = useState<boolean>(false);
    const [disableRightBtn, setDisableRightBtn] = useState<boolean>(true);
    useEffect(() => {
        pageNumber === 1 ? setDisableLeftBtn(true) : setDisableLeftBtn(false)
    }, [pageNumber]);
    useEffect(() => {
        pagesCount === pageNumber ? setDisableRightBtn(false) : setDisableLeftBtn(true)
    }, [pageNumber]);

    // Callbacks
    const dispatch = useDispatch();
    const b4Call = () => {

        pageNumber = btns[1];
        setBtns([pageNumber, pageNumber + 3]);
        setIsB4(false);
        setIsB1(true);
        setPage(null);
    };
    const b1Call = () => {

        setIsB1(true);
        if (btns[0] > 1) {
            pageNumber = btns[0];
            setBtns([pageNumber - 3, pageNumber]);
            setIsB4(false)
        }
        setPage(null);
    };
    // Изменение состояния кнопок 2, 3
    useEffect(() => {
        btns2[0] !== btns[0] + 1 && setBtns2([btns[0] + 1, btns[0] + 2]);
    }, [btns2]);

    // Вызов санки, экшена
    const setPage = (btn: number | null) => {

        if (btn === 0) {
            pageNumber = btns2[0];
        } else if (btn === 1) {
            pageNumber = btns2[1];
        }
        setBtns2([btns[0] + 1, btns[0] + 2]);
        dispatch(SetNewPageAC(pageNumber));
        const token = getItemFromLS('token') as string;
        dispatch(getPacksNew(token, pageNumber))
    };


    return <Paginator title={''}
                      pageNumber={pageNumber}
                      setPage={setPage}
                      disableLeftBtn={disableLeftBtn}
                      disableRightBtn={disableRightBtn}
                      lastPage={lastPage}
                      b4Call={b4Call}
                      b1Call={b1Call}
                      b1={btns[0]} b2={btns2[0]} b3={btns2[1]} b4={btns[1]}
    />
};












