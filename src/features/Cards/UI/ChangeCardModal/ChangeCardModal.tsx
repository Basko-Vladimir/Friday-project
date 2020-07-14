import React, {ChangeEvent, useEffect, useState} from 'react';
import {Modal} from '../../../../main/UI/common/Modal Windows/Modal/Modal';
import {NewInput} from '../../../../main/UI/common/NewInput/NewInput';
import {Button} from '../../../../main/UI/common/Button/Button';

type ChangeCardModalPropsType = {
    modalType: string
    hideModal: () => void
    changeCard: (question: string, answer: string) => void
    currentQuestion: string
    currentAnswer: string
}

export const ChangeCardModal = React.memo((props: ChangeCardModalPropsType) => {
    const {modalType, changeCard, hideModal, currentQuestion, currentAnswer} = props;
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        setQuestion(currentQuestion);
        setAnswer(currentAnswer)
    }, [currentQuestion, currentAnswer, setQuestion, setAnswer]);

    const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    };

    const changeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    };

    const onChangeCard = () => {
        changeCard(question, answer);
        hideModal();
    };

    return (
        <Modal isShow={modalType === 'change'} hideModal={hideModal}
               modalSize={{width: '400px', height: '300px'}}>
            Change question:
            <NewInput placeholder={'Enter question'} value={question} onChange={changeQuestion}
                      autoFocus={true} style={{marginBottom: '10px'}}/>
            Change answer:
            <NewInput placeholder={'Enter answer'} value={answer}
                      onChange={changeAnswer} autoFocus={true}/>
            <Button title={'Save changing'} onClick={onChangeCard}/>
        </Modal>
    )
});