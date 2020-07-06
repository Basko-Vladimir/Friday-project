import React, {InputHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react';
import styles from './NewInput.module.scss';

export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & { error?: string, onChangeHandler?: (value: string) => void }

export const NewInput: React.FC<InputPropsType> = React.memo(({error, onChangeHandler, onChange,  ...props}) => {

   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
       onChangeHandler && onChangeHandler(e.currentTarget.value);
       onChange && onChange(e)
   };
    return (
        <>
            <input className={styles.input} onChange={onChangeCallback} {...props}/>
            {error && <span>{error}</span>}
        </>
    )
});
