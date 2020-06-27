import React, {InputHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './Input.module.css';

export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & { error?: string, value?: string, changeInput?: () => void }

export const Input: React.FC<InputPropsType> = ({error, value, changeInput, ...props}) => {
    return (
        <>
            <input className={styles.input} {...props} value={value} onChange={changeInput} />
            {error && <span>{error}</span>}
        </>
    )
};
