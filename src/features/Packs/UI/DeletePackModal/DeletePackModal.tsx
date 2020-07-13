import React from 'react';
import styles from './DeletePackModal.module.scss';
import {Modal} from '../../../../main/UI/common/Modal/Modal';
import {Button} from '../../../../main/UI/common/Button/Button';

type DeletePackModal = {
    modalType: string
    deletePack: () => void
    hideModal: () => void
}

export const DeletePackModal = React.memo((props: DeletePackModal) => {
    const {modalType, deletePack, hideModal} = props;

    const onDeletePack = () => {
        deletePack();
        hideModal()
    };

    return (
        <Modal isShow={modalType === 'delete'}>
            <p>Do you really to want delete this Pack?</p>
            <div className={styles.buttonsBlock}>
                <Button title={'Yes'} onClick={onDeletePack}/>
                <Button title={'No'} onClick={hideModal}/>
            </div>
        </Modal>
    )
});
