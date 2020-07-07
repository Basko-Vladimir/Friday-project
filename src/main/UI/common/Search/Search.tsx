import React, {InputHTMLAttributes, DetailedHTMLProps, ChangeEvent, useState} from 'react';
import {Button} from "../Button/Button";
import s from './Search.module.scss'
import {Input} from "../Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {PackItemType} from "../../../../features/Packs/types";
import {getPacks, setPacks} from "../../../../features/Packs/BLL/packsReducer";
import {getItemFromLS} from "../../../../features/Sign-In/LS-service/localStorage";


export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> &
    { searchQuery?: string, setQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        toSearch?: () => void, toReset?: () => void}

export const Search: React.FC<InputPropsType> =
    React.memo(({ onChange, setQuery, searchQuery, toSearch, toReset, ...props}) => {


    return <div className={s.container}>
        <div className={s.searchArea}>
            <Input changeInput={setQuery} {...props} type='text'
                   placeholder='Card name' value={searchQuery}

            />
        </div>
        <Button title='Search' onClick={toSearch} style={{marginRight: '20px'}}/>
        <Button title='Reset' onClick={toReset}/>
    </div>
});

export const SearchContainer = () => {

    // Достаём массив колод из state
    const dispatch = useDispatch();
    const cardsPack = useSelector<AppStateType, Array<PackItemType>>(state => state.packs.packs);

    // Сброс результатов поиска
    const toReset = () => {
        const token = getItemFromLS('token') as string; // Достаём токен, т.к. его надо передать в getPacks
        dispatch(getPacks(token))
    };

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

    return <Search setQuery={setQuery} searchQuery={searchQuery} toSearch={toSearch} toReset={toReset}/>
};
