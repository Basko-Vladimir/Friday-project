import React, {ButtonHTMLAttributes, DetailedHTMLProps, useEffect, useState} from 'react';
import s from './Paginator.module.scss';
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {getPacksNew, SetNewPageAC} from "../../../../features/Packs/BLL/packsReducer";
import {getItemFromLS} from "../../../../features/Sign-In/LS-service/localStorage";

export type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> &
    {
        title: string, pageNumber: number, setPage: () => void,
        disableLeftBtn: boolean, disableRightBtn: boolean
    };

const Paginator: React.FC<ButtonPropsType> = React.memo(({title, pageNumber, setPage,
                                                             disableLeftBtn, disableRightBtn, ...props}) => {
    return (
        <div className={s.container}>
            <h3>Pages</h3>
            <Button title={'<'} className={s.arrow} disabled={disableLeftBtn}/>
            <Button title={'1'} className={s.button}/>
            <Button title={'2'} className={s.button} onClick={setPage}/>
            <Button title={'3'} className={s.button}/>
            <Button title={'4'} className={s.button}/>
            <span>...</span>
            <Button title={'10'} className={s.button}/>
            <Button title={'>'} className={s.arrow} disabled={disableRightBtn}/>
        </div>
    )
});
export const PaginatorContainer = () => {


    const pageSize = useSelector<AppStateType, number>(s => s.packs.pageCount); // Кол-во элементов на странице(РАЗМЕР)
    const itemsCount = useSelector<any, number>(s => s.packs.packs.length);  //Кол-во колод
    const pagesCount = Math.ceil(itemsCount / pageSize); // Кол-во страниц
    const pageNumber = useSelector<AppStateType, number>(s => s.packs.page); // Текущая страница
    // const portionSize = 5 as number;
    let firstPage = (pageNumber - 1) * pageSize + 1;
    let lastPage = pageNumber * pageSize;
    const currentPage = 2; // Текущая страница

    const [disableLeftBtn, setDisableLeftBtn] = useState<boolean>(false);
    const [disableRightBtn, setDisableRightBtn] = useState<boolean>(true);
    useEffect(() => {
        pageNumber !== 1 ? setDisableLeftBtn(true) : setDisableLeftBtn(false)
    });
    useEffect(() => {
        pagesCount === pageNumber ? setDisableRightBtn(true) : setDisableLeftBtn(false)
    });
    const dispatch = useDispatch();
    const setPage = () => {
        dispatch(SetNewPageAC(currentPage));
        const token = getItemFromLS('token') as string;
        dispatch(getPacksNew(token, currentPage))
    };



    return <Paginator title={''}
                      pageNumber={pageNumber}
                      setPage={setPage}
                      disableLeftBtn={disableLeftBtn}
                      disableRightBtn={disableRightBtn}
    />
};












