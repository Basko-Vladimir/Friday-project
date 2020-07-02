import React, {ChangeEvent, FormEvent} from 'react';
import styles from './SetNewPass.module.scss';
import {NewInput} from '../../../main/UI/common/NewInput/NewInput';
import {NavLink} from 'react-router-dom';
import {SIGN_IN_PATH} from '../../../main/UI/Routes/Routes';
import {Button} from '../../../main/UI/common/Button/Button';
import {Message} from '../../../main/UI/common/Message/Message';
import {setMessageText} from '../../../main/BLL/appReducer';

type SetNewPassPropsType = {
    password: string
    passwordRepeat: string
    sendNewPassword: (e: FormEvent<HTMLFormElement>) => void
    changePassword: (e: ChangeEvent<HTMLInputElement>) => void
    changePasswordRepeat: (e: ChangeEvent<HTMLInputElement>) => void
    messageText: string
    isResponseError: boolean
}

export const SetNewPass: React.FC<SetNewPassPropsType> = React.memo( (props) => {
    const {password, passwordRepeat, sendNewPassword, changePassword,
        changePasswordRepeat, messageText, isResponseError} = props;

    return (
        <div>
            <h1>Set New Password</h1>
            <form className={styles.form} onSubmit={sendNewPassword}>
                <NewInput value={password} placeholder={'Enter new password'}
                          onChange={changePassword} type={'password'}/>
                <NewInput value={passwordRepeat} placeholder={'Repeat password'}
                          onChange={changePasswordRepeat} type={'password'}/>
                <NavLink to={SIGN_IN_PATH}>Sign In</NavLink>
                <Button title={'Set password'}/>
            </form>
            {
                messageText && <Message messageText={messageText} isResponseError={isResponseError}
                                        actionCreator={setMessageText('')} />
            }
        </div>
    )
});