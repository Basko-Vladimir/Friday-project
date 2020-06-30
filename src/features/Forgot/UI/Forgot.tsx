import React, {ChangeEvent, FormEvent} from 'react';
import styles from './Forgot.module.scss';
import {Button} from '../../../main/UI/common/Button/Button';
import {NewInput} from '../../../main/UI/common/NewInput/NewInput';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import { NavLink } from 'react-router-dom';
import {ErrorMessage} from '../../../main/UI/common/ErrorMessage/ErrorMessage';

type ForgotPropsType = {
    email: string
    errorText: string
    changeEmail: (e: ChangeEvent<HTMLInputElement>) => void
    sendEmail: (e: FormEvent<HTMLFormElement>) => void
}

export const Forgot:React.FC<ForgotPropsType> = React.memo((props) => {
    const {email, changeEmail, errorText, sendEmail} = props;

    return (
        <div>
            <h1>Forgot</h1>
            <form className={styles.form} onSubmit={sendEmail}>
                <NewInput type={'text'} placeholder={'Enter your e-mail'}
                          value={email} onChange={changeEmail}/>
                <Button title={'Send email'}/>
            </form>
            <NavLink to={SIGN_IN_PATH}>Sign In</NavLink>
            {errorText && <div className={styles.errorBlock}>
                <div className={styles.background}> </div>
                <ErrorMessage errorText={errorText}/>
            </div>}
        </div>

    )
});