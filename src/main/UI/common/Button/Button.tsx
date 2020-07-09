import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './Button.module.scss';

export type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> & { title: string };

export const Button: React.FC<ButtonPropsType> = React.memo(({title, ...props}) => {
    return (
        <div>
            <button className={styles.button} {...props}>{title}</button>
        </div>
    )
});
