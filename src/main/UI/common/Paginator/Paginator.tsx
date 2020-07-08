import React, {ButtonHTMLAttributes, DetailedHTMLProps, useState} from 'react';
import s from './Paginator.module.scss';
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {PackItemType} from "../../../../features/Packs/types";
import {getPacksNew, SetNewPageAC} from "../../../../features/Packs/BLL/packsReducer";
import {getItemFromLS} from "../../../../features/Sign-In/LS-service/localStorage";

export type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> & { title: string, page: number, setPage: () => void};

const Paginator: React.FC<ButtonPropsType> = React.memo(({title, page, setPage, ...props}) => {
    return (
        <div className={s.container}>
            <h3>Pages</h3>
            <Button title={'<'} className={s.arrow}/>
            <Button title={'1'} className={s.button}/>
            <Button title={'2'} className={s.button} onClick={setPage}/>
            <Button title={'3'} className={s.button}/>
            <Button title={'4'} className={s.button}/>
            <span>...</span>
            <Button title={'10'} className={s.button}/>
            <Button title={'>'} className={s.arrow}/>
        </div>
    )
});
export const PaginatorContainer = () => {


    const lastPage = () => { // Логика вычисления последней страницы

    };
    const newPage = 2;
    const dispatch = useDispatch();
    const setPage = () => {
        dispatch(SetNewPageAC(newPage));
        const token = getItemFromLS('token') as string;
        dispatch(getPacksNew(token, newPage))
    };

    const page = useSelector<AppStateType, number>(s => s.packs.page);

    return <Paginator title={''} page={page} setPage={setPage}/>
};












