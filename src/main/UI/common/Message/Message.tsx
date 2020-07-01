import React from 'react';
import styles from './Message.module.scss';
import {Button} from '../Button/Button';
import {useDispatch} from 'react-redux';
import {SetMessageTextType} from '../../../../features/Sign-In/BLL/signInReducer';

type MessagePropsType = {
    messageText: string
    isResponseError: boolean
    actionCreator: SetMessageTextType
}

export const Message: React.FC<MessagePropsType> = React.memo((props) => {
    const {messageText, isResponseError, actionCreator} = props;
    const messageClass = isResponseError ? `${styles.message} ${styles.error} ` : styles.message;
    const dispatch = useDispatch();

    const closeMessage = () => {
        dispatch(actionCreator)
    };

    return <>
        <div className={styles.background}> </div>
        <div className={messageClass}>
            <h3>{messageText}</h3>
            <Button title={'Close'} onClick={closeMessage}/>
        </div>
    </>
});