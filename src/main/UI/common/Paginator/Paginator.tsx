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
        title: string, currentPage: number, setPage: any,
        disableLeftBtn: boolean, disableRightBtn: boolean, lastPage: any,
        b4Call: () => void, b1Call: () => void, b1: string | number, b2: string | number,
        b3: string | number, b4: string | number, showSpan: boolean, arrowsCall: any
    };

const Paginator: React.FC<ButtonPropsType> =
    React.memo(({ title, currentPage, setPage, disableLeftBtn, disableRightBtn, lastPage,
                    b4Call, b1Call, b1, b2, b3, b4, showSpan, arrowsCall,
                                                             ...props
                                                         }) => {
    return (
        <div className={s.container}>
            <h3>Pages</h3>
            <Button title={'<'} className={s.arrow} disabled={disableLeftBtn} onClick={() => {arrowsCall('left')}}/>
            <Button title={b1.toString()} className={s.button} onClick={b1Call}/>
            <Button title={b2.toString()} className={s.button} onClick={() => {
                setPage(0)
            }}/>
            <Button title={b3.toString()} className={s.button} onClick={() => {
                setPage(1)
            }}/>
            <Button title={b4.toString()} className={s.button} onClick={b4Call}/>
            {showSpan &&  <span>...</span>}
            <Button title={lastPage || '...'} className={s.button} onClick={() => {setPage(lastPage)}}/>
            <Button title={'>'} className={s.arrow} disabled={disableRightBtn} onClick={() => {arrowsCall('right')}}/>
        </div>
    )
});
export const PaginatorContainer = () => {

    // Нужно починить:
    // 1. Дизейблы.
    // 2. Переключение страниц стрелками

    // Значения кнопок
    const [btns, setBtns] = useState([1, 4]);
    const [btns2, setBtns2] = useState([btns[0] + 1, btns[0] + 2]);

debugger
    // Данные
    // const itemsCount = useSelector<any, number>(s => s.packs.packs.length);  //Кол-во колод
    // const pagesCount = Math.ceil(itemsCount / pageSize); // Кол-во страниц
    // let lastPage = currentPage * pageSize;
    // const pageSize = useSelector<AppStateType, number>(s => s.packs.pageCount); // Кол-во элементов на странице(РАЗМЕР)

    let currentPage = useSelector<AppStateType, number>(s => s.packs.page); // Текущая страница
    let lastPage = 25;

    // span show
    const [showSpan, setShowSpan] = useState<boolean>(true);

    // Проверки на кнопку 1,4
    const [isB4, setIsB4] = useState<boolean>(false);
    const [isB1, setIsB1] = useState<boolean>(true);

    // Блокировка кнопок <>
    const [disableLeftBtn, setDisableLeftBtn] = useState<boolean>(false);
    const [disableRightBtn, setDisableRightBtn] = useState<boolean>(true);

    useEffect(() => {
        if (currentPage === 1) {
            setDisableLeftBtn(true);
        } else if (lastPage === currentPage) {
            setDisableRightBtn(true);
            setShowSpan(false);
            setDisableLeftBtn(false);
        } else if (currentPage < lastPage - 4 ) {
            setShowSpan(true);
        }
        else {
            setDisableRightBtn(false);
            setDisableLeftBtn(false);
        }
    }, [currentPage]);
    useEffect(() => {btns[0] < 1 && setBtns([1, 4])});

    // Callbacks
    const dispatch = useDispatch();

    // переключение страниц <>
    const arrowsCall = (dir: string) => {
       if (dir === 'left' && currentPage > 1) {
           currentPage -= 1
       } else {
           currentPage += 1
       }
        setPage(null);
    };
    //Кнопка 4
    const b4Call = () => {
        if(btns[1] === lastPage - 1) {
            currentPage = btns[1];
        } else {
            currentPage = btns[1];
            setBtns([currentPage, currentPage + 3]);
        }
        setIsB4(true);
        setIsB1(false);
        setPage(null);
    };
    //Кнопка 1
    const b1Call = () => {
        setIsB1(true);
        if (btns[0] > 1) {
            currentPage = btns[0];
            setBtns([currentPage - 3, currentPage]);
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
            currentPage = btns2[0];
        } else if (btn === 1) {
            currentPage = btns2[1];
        } else if (btn === lastPage) {
            currentPage = lastPage;
            setBtns([lastPage - 4, lastPage - 1]);
        }
        setBtns2([btns[0] + 1, btns[0] + 2]);
        dispatch(SetNewPageAC(currentPage));
        const token = getItemFromLS('token') as string;
        dispatch(getPacksNew(token, currentPage))
    };


    return <Paginator title={''}
                      currentPage={currentPage}
                      setPage={setPage}
                      disableLeftBtn={disableLeftBtn}
                      disableRightBtn={disableRightBtn}
                      lastPage={lastPage}
                      b4Call={b4Call}
                      b1Call={b1Call}
                      b1={btns[0]} b2={btns2[0]} b3={btns2[1]} b4={btns[1]}
                      showSpan={showSpan}
                      arrowsCall={arrowsCall}
    />
};












