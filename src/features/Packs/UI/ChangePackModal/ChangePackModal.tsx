import React, {useState, ChangeEvent, useEffect} from 'react';
import {Modal} from '../../../../main/UI/common/Modal Windows/Modal/Modal';
import {Button} from '../../../../main/UI/common/Button/Button';
import {NewInput} from '../../../../main/UI/common/NewInput/NewInput';

type AddPackModalPropsType = {
    modalType: string
    hideModal: () => void
    onChangePack: (value: string) => void
    currentPackName: string
}

export const ChangePackModal = React.memo((props: AddPackModalPropsType) => {
    const {modalType, hideModal, onChangePack, currentPackName} = props;
    const [name, setName] = useState<string>('');

    useEffect(() => {
        setName(currentPackName)
    }, [currentPackName, setName]);

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    };

    const changePack = () => {
        onChangePack(name);
        hideModal();
    };

    return (
        <Modal isShow={modalType === 'change'} hideModal={hideModal}>
            Change name:
            <NewInput placeholder={'Enter new name'} value={name}
                      onChange={changeInput} autoFocus={true}/>
            <Button title={'Save changing'} onClick={changePack}/>
        </Modal>
    )
});
