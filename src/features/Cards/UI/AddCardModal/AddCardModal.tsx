import React, {ChangeEvent, useState} from 'react';
import {Modal} from '../../../../main/UI/common/Modal/Modal';
import {NewInput} from '../../../../main/UI/common/NewInput/NewInput';
import {Button} from '../../../../main/UI/common/Button/Button';

type AddCardModalPropsType = {
    modalType: string
    hideModal: () => void
    addCard: (question: string, answer: string) => void
}

export const AddCardModal = React.memo((props: AddCardModalPropsType) => {
    const {modalType, addCard, hideModal} = props;
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    };

    const changeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    };

    const onAddCard = () => {
        addCard(question, answer);
        hideModal();
    };

    return (
        <Modal isShow={modalType === 'add'} hideModal={hideModal}
               modalSize={{width: '400px', height: '300px'}}>
            New card question:
            <NewInput placeholder={'Enter question'} value={question} onChange={changeQuestion}
                      autoFocus={true} style={{marginBottom: '10px'}}/>
            New card answer:
            <NewInput placeholder={'Enter answer'} value={answer}
                      onChange={changeAnswer} autoFocus={true}/>
            <Button title={'Create card'} onClick={onAddCard}/>
        </Modal>
    )
});