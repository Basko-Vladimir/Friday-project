import React from 'react';
import styles from './Modal.module.scss';

type ModalPropsType = {
    modalSize?: { width: string, height: string}
    isResponseError?: boolean
    children: React.ReactNode
    isShow: boolean
    hideModal?: () => void
}

export const Modal = React.memo((props:ModalPropsType) => {
    const {modalSize, isResponseError, children, isShow, hideModal} = props;
    const modalClass = isResponseError ? `${styles.modal} ${styles.error} ` : styles.modal;

    if (!isShow) return null;

    return (
        <>
            <div className={styles.background} onClick={hideModal}> </div>
            <div className={modalClass} style={modalSize}>
                {children}
            </div>
        </>

    )
});