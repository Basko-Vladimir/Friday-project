import React from 'react';
import styles from './SignIn.module.css';
import {Input} from '../../../main/UI/common/Input/Input';
import {Button} from '../../../main/UI/common/Button/Button';
import {FORGOT_PATH, SIGN_UP_PATH} from '../../../main/UI/Routes/Routes';
import {NavLink} from 'react-router-dom';

export const SignIn = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <form >
                <div>
                    <Input/>
                </div>
                <div>
                    <Input/>
                </div>
                <div className={styles.forgotLink}>
                    <NavLink to={FORGOT_PATH}>Forgot password?</NavLink>
                </div>
                <div className={styles.checkbox}>
                    <label>
                        <Input type={'checkbox'} value={'Remember Me'} className={styles.checkbox}/>
                        Remember Me
                    </label>
                </div>
                <div>
                    <Button title={'Sign in'}/>
                </div>
                <div className={styles.registrationLink}>
                    <NavLink to={SIGN_UP_PATH}>Registration</NavLink>
                </div>
            </form>
        </div>
    )
};