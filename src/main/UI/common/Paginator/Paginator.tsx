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
        b4Call: () => void, b1Call: () => void, b1: string | number, b2:  string | number,
        b3:  string | number, b4:  string | number,
        // middleBtnCall: () => void
    };

const Paginator: React.FC<ButtonPropsType> = React.memo(({title, pageNumber, setPage,
                                                             disableLeftBtn, disableRightBtn, lastPage,
                                                             b4Call, b1Call, b1, b2, b3, b4,
                                                             // middleBtnCall,
                                                             ...props}) => {
    return (
        <div className={s.container}>
            <h3>Pages</h3>
            <Button title={'<'} className={s.arrow} disabled={disableLeftBtn}/>
            <Button title={b1.toString()} className={s.button} onClick={b1Call}/>
            <Button title={b2.toString()} className={s.button} onClick={() => {setPage(0)}}/>
            <Button title={b3.toString()} className={s.button} onClick={() => {setPage(1)}}/>
            <Button title={b4.toString()} className={s.button} onClick={b4Call}/>
            <span>...</span>
            <Button title={lastPage || '...'} className={s.button}/>
            <Button title={'>'} className={s.arrow} disabled={disableRightBtn}/>
        </div>
    )
});
export const PaginatorContainer = () => {
    // Значения кнопок
    const [bnts, setBtns] = useState([1,4]);
    const [bnts2, setBtns2] = useState([bnts[0] + 1, bnts[0] + 2]);
    // let [b1, b4] = [1, 4];
    // let [b2, b3,] = [b1 + 1, b1 + 2];

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
            setBtns([pageNumber, pageNumber + 3]);
            pageNumber = bnts[1];
            // b1 = pageNumber;
            // b4 = pageNumber + 3;
            setIsB4(false);
            setIsB1(true);
        setPage(null);
    };
    const b1Call = () => {
        setIsB1(true);
        if (bnts[0] > 1) {
            setBtns([pageNumber - 3, pageNumber]);
            pageNumber = bnts[0];
            // b4 = pageNumber;
            // b1 = pageNumber - 3;
            setIsB4(false)
        }
        setPage(null);
    };

    // const middleBtnCall = (btn: number) => {
    //     btn === 0 ? pageNumber = bnts2[0] : pageNumber = bnts2[1];
    //     dispatch(SetNewPageAC(pageNumber));
    // };
    const setPage = (btn: number | null) => {
        if (btn === 0) {
            pageNumber = bnts2[0];
        } else if (btn === 1) {
            pageNumber = bnts2[1];
        }
        // btn === 0 ? pageNumber = bnts2[0] : pageNumber = bnts2[1];
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
                      b1={bnts[0]} b2={bnts2[0]} b3={bnts2[1]} b4={bnts[1]}
                      // middleBtnCall={middleBtnCall}
    />
};












