import React, {ChangeEvent, FormEvent} from 'react';
import styles from './SignIn.module.scss';
import {NewInput} from '../../../main/UI/common/NewInput/NewInput';
import {NavLink} from 'react-router-dom';
import {FORGOT_PATH, SIGN_UP_PATH} from '../../../main/UI/Routes/Routes';
import {Button} from '../../../main/UI/common/Button/Button';
import { ErrorMessage } from '../../../main/UI/common/ErrorMessage/ErrorMessage';

type SignInPropsType = {
    email: string
    password: string
    isRemember: boolean
    errorText: string
    changeEmail: (e: ChangeEvent<HTMLInputElement>) => void
    changePass: (e: ChangeEvent<HTMLInputElement>) => void
    changeIsRemember: (e: ChangeEvent<HTMLInputElement>) => void
    sendFormData: (e: FormEvent<HTMLFormElement>) => void
}

export const SignIn: React.FC<SignInPropsType> = React.memo((props) => {
    const {email, password, isRemember, errorText,  changePass,
            changeEmail, changeIsRemember, sendFormData} = props;
    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={sendFormData} className={styles.form}>
                <NewInput type={'text'} placeholder={'Enter your e-mail'}
                          onChange={changeEmail} value={email}/>
                <NewInput type={'password'} placeholder={'Enter your password'}
                          onChange={changePass} value={password}/>
                <NavLink to={FORGOT_PATH} className={styles.forgotLink}>Forgot password?</NavLink>
                <label>
                    <NewInput type={'checkbox'} className={styles.checkbox}
                              onChange={changeIsRemember} checked={isRemember}/>Remember Me
                </label>
                <Button title={'Sign in'}/>
                <NavLink to={SIGN_UP_PATH}>Registration</NavLink>
                {errorText && <div className={styles.errorBlock}>
                                    <div className={styles.background}> </div>
                                    <ErrorMessage errorText={errorText}/>
                              </div>}
            </form>
        </div>
    )
});