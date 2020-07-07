import React, {InputHTMLAttributes, DetailedHTMLProps, ChangeEvent, useState, ClassAttributes, useEffect} from 'react';
import {Button} from "../Button/Button";
import s from './Search.module.scss'
import {Input} from "../Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {PackItemType} from "../../../../features/Packs/types";
import {setPacks} from "../../../../features/Packs/BLL/packsReducer";


export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> &
    { searchQuery?: string, setQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        toSearch?: () => void }

export const Search: React.FC<InputPropsType> =
    React.memo(({ onChange, setQuery, searchQuery, toSearch, ...props}) => {


    return <div className={s.container}>
        <div className={s.searchArea}>
            <Input changeInput={setQuery} {...props} type='text'
                   placeholder='Card name' value={searchQuery}

            />
        </div>
        <Button title='Search' onClick={toSearch}/>
    </div>
});

export const SearchContainer = () => {

    // Достаём массив колод из state
    const dispatch = useDispatch();
    const cardsPack = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);



    const toSearch = () => {
        let result = cardsPack.filter((i: PackItemType) => {
            return i.name.match(new RegExp(searchQuery, 'g'));
        });  // Поиск совпадений запроса в массиве колод
        dispatch(setPacks(result)); // Сетаем новый массив
    };

    const [searchQuery, setSearchQuery] = useState('');
    const setQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value)
    };
    debugger
    return <Search setQuery={setQuery} searchQuery={searchQuery} toSearch={toSearch}/>
};
