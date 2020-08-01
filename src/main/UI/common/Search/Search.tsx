import React, {InputHTMLAttributes, DetailedHTMLProps} from 'react';
import {Button} from "../Button/Button";
import s from './Search.module.scss'
import {Input} from "../Input/Input";


export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> &
    { searchQuery?: string, setQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        toSearch?: () => void, toReset?: () => void}

export const Search: React.FC<InputPropsType> =
    React.memo(({ onChange, setQuery, searchQuery, toSearch, toReset, onKeyPress, ...props}) => {

    return <div className={s.container}>
        <div className={s.searchArea}>
            <Input changeInput={setQuery} {...props} type='text'
                   placeholder='Card name' value={searchQuery}
                   onKeyPress={onKeyPress}
            />
        </div>
        <Button title='Search' onClick={toSearch} style={{marginRight: '20px'}}/>
        <Button title='Reset' onClick={toReset}/>
    </div>
});


