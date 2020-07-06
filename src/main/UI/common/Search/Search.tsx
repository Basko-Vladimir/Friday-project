import React, {InputHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react';
import {Button} from "../Button/Button";
import s from './Search.module.scss'

export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & { error?: string, onChangeHandler?: (value: string) => void }

export const Search: React.FC<InputPropsType> = React.memo(({error, onChangeHandler, onChange, ...props}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler && onChangeHandler(e.currentTarget.value);
        onChange && onChange(e)
    };
    return <div className={s.container}>
        <div className={s.searchArea}>
            <input onChange={() => {
            }} {...props} type='text' placeholder='Card name'/>
            {error && <span>{error}</span>}
        </div>
        <Button title='Search'/>
    </div>
});

export const SearchContainer = () => {


    return <Search/>
};
