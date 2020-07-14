import React from 'react';
import styles from './DeleteCardModal.module.scss';
import {Modal} from '../Modal/Modal';
import {Button} from '../../Button/Button';

type DeleteItemModalPropsType = {
    modalType: string
    deleteItem: () => void
    hideModal: () => void
}

export const DeleteItemModal = React.memo((props: DeleteItemModalPropsType) => {
    const {modalType, deleteItem, hideModal} = props;

    const onDelete = () => {
        deleteItem();
        hideModal()
    };

    return (
        <Modal isShow={modalType === 'delete'}>
            <p>Are you sure to want delete?</p>
            <div className={styles.buttonsBlock}>
                <Button title={'Yes'} onClick={onDelete}/>
                <Button title={'No'} onClick={hideModal}/>
            </div>
        </Modal>
    )
});