import React, {InputHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './NewInput.module.scss';

export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & { error?: string }

export const NewInput: React.FC<InputPropsType> = React.memo(({error, ...props}) => {
    return (
        <>
            <input className={styles.input} {...props}/>
            {error && <span>{error}</span>}
        </>
    )
});
