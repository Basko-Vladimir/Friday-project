import React from 'react';
import styles from './Modal.module.scss';

type ModalPropsType = {
    modalSize?: { width: string, height: string}
    isResponseError?: boolean
    children: React.ReactNode
}

export const Modal = React.memo( (props:ModalPropsType) => {
    const {isResponseError, children} = props;
    const modalClass = isResponseError ? `${styles.modal} ${styles.error} ` : styles.modal;
    return (
        <>
            <div className={styles.background}> </div>
            <div className={modalClass}>
                {children}
            </div>
        </>

    )
});