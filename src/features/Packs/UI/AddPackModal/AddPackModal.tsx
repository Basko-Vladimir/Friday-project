import React, {useState, ChangeEvent} from 'react';
import {Modal} from '../../../../main/UI/common/Modal/Modal';
import {Button} from '../../../../main/UI/common/Button/Button';
import {NewInput} from '../../../../main/UI/common/NewInput/NewInput';

type AddPackModalPropsType = {
    modalType: string
    hideModal: () => void
    addPack: (value: string) => void
}

export const AddPackModal = React.memo((props: AddPackModalPropsType) => {
    const {modalType, hideModal, addPack} = props;
    const [name, setName] = useState<string>('');

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    };

    const onAddPack = () => {
        addPack(name);
        hideModal();
    };

    return (
        <Modal isShow={modalType === 'add'} hideModal={hideModal}>
            New pack name:
            <NewInput placeholder={'Enter name'} value={name}
                      onChange={changeInput} autoFocus={true}/>
            <Button title={'Create pack'} onClick={onAddPack}/>
        </Modal>
    )
});
