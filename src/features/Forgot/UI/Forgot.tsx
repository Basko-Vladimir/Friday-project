import React, {ChangeEvent, FormEvent} from 'react';
import styles from './Forgot.module.scss';
import {Button} from '../../../main/UI/common/Button/Button';
import {NewInput} from '../../../main/UI/common/NewInput/NewInput';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import { NavLink } from 'react-router-dom';
import {Message} from '../../../main/UI/common/Message/Message';
import { setMessageText } from '../../../main/BLL/appReducer';

type ForgotPropsType = {
    email: string
    messageText: string
    isResponseError: boolean
    changeEmail: (e: ChangeEvent<HTMLInputElement>) => void
    sendEmail: (e: FormEvent<HTMLFormElement>) => void
}

export const Forgot:React.FC<ForgotPropsType> = React.memo((props) => {
    const {email, messageText, isResponseError, changeEmail, sendEmail} = props;
    return (
        <div>
            <h1>Forgot</h1>
            <form className={styles.form} onSubmit={sendEmail}>
                <NewInput type={'text'} placeholder={'Enter your e-mail'}
                          value={email} onChange={changeEmail}/>
                <NavLink to={SIGN_IN_PATH}>Sign In</NavLink>
                <Button title={'Send email'}/>
            </form>
            {
                messageText && <Message messageText={messageText} isResponseError={isResponseError}
                                        actionCreator={setMessageText('')}/>
            }
        </div>
    )
});