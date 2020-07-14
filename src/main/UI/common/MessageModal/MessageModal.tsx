import React, {useCallback} from 'react';
import {Button} from '../Button/Button';
import {useDispatch} from 'react-redux';
import {SetMessageTextType} from '../../../BLL/appReducer';
import {Modal} from '../Modal/Modal';

type MessageModalPropsType = {
    messageText: string
    isResponseError: boolean
    actionCreator: SetMessageTextType
}

export const MessageModal: React.FC<MessageModalPropsType> = React.memo((props) => {
    const {messageText, isResponseError, actionCreator} = props;
    const dispatch = useDispatch();

    const closeMessage = useCallback(() => {
        dispatch(actionCreator)
    }, [dispatch, actionCreator]);

    return <>
        <Modal isResponseError={isResponseError} isShow={Boolean(messageText)}>
            <h3>{messageText}</h3>
            <Button title={'Close'} onClick={closeMessage}/>
        </Modal>
    </>
});


