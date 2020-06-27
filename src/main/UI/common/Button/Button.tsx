import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './Button.module.css';

export type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> & { title: string };

export const Button: React.FC<ButtonPropsType> = ({title, ...props}) => {
    return (
        <div>
            <button className={styles.button} {...props}>{title}</button>
        </div>
    )
};
