import React from 'react';
import styles from './ErrorMessage.module.scss';
import {Button} from '../Button/Button';
import {useDispatch} from 'react-redux';
import { setErrorText } from '../../../../features/Sign-In/BLL/signInReducer';

type ErrorMessagePropsType = {
    errorText: string
}

export const ErrorMessage: React.FC<ErrorMessagePropsType> = ({errorText}) => {
    const dispatch = useDispatch();

    const closeMessage = () => {
        dispatch(setErrorText(''))
    };

    return (
        <div className={styles.errorBlock}>
            <h3>{errorText}</h3>
            <Button title={'Close'} onClick={closeMessage}/>
        </div>
    )
};