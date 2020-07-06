import React, {InputHTMLAttributes, DetailedHTMLProps, ChangeEvent, useState} from 'react';
import {Button} from "../Button/Button";
import s from './Search.module.scss'
import {Input} from "../Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {PackItemType} from "../../../../features/Packs/types";


export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & { searchQuery?: string, setQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void }

export const Search: React.FC<InputPropsType> =
    React.memo(({ onChange, setQuery, searchQuery, ...props}) => {


    return <div className={s.container}>
        <div className={s.searchArea}>
            <Input onChange={setQuery} {...props} type='text'
                   placeholder='Card name' value={searchQuery}

            />
        </div>
        <Button title='Search'/>
    </div>
});

export const SearchContainer = () => {

    const dispatch = useDispatch();
    const cardsPack = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);
    const toSearch = (cardsPack:any) => {
        return cardsPack.find.match(searchQuery); // Поиск совпадений запроса в массиве колод
    };
    const newPacksRange = dispatch(<></>); // Вызвать санку, и засунуть туда новый Pack
    const [searchQuery, setSearchQuery] = useState('');
    const setQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value)
    };
    return <Search setQuery={setQuery} searchQuery={searchQuery}/>
};
