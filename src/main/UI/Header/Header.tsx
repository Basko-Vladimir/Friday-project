import React from 'react';
import styles from './Header.module.scss';
import {NavLink} from 'react-router-dom';
import {
    SIGN_IN_PATH, SIGN_UP_PATH, FORGOT_PATH,
    SET_NEW_PASS_PATH, PROFILE_PATH, PACKS_PATH, LEARN
} from '../Routes/Routes';
import {Button} from '../common/Button/Button';
import {setItemToLS} from '../../../features/Sign-In/LS-service/localStorage';
import {loginSuccess, setUserData} from '../../../features/Sign-In/BLL/signInReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../BLL/store';

export const Header = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppStateType, boolean>(state => state.signIn.isAuth);

    const signOut = () => {
        setItemToLS('token', null);
        dispatch(setUserData(null));
        dispatch(loginSuccess(false));
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navMenu}>
                <NavLink to={SIGN_IN_PATH} activeClassName={styles.active}>Sign In</NavLink>
                <NavLink to={SIGN_UP_PATH} activeClassName={styles.active}>Sign Up</NavLink>
                <NavLink to={FORGOT_PATH} activeClassName={styles.active}>Forgot</NavLink>
                <NavLink to={SET_NEW_PASS_PATH} activeClassName={styles.active}>Set New Password</NavLink>
                <NavLink to={PROFILE_PATH} activeClassName={styles.active}>Profile</NavLink>
                <NavLink to={PACKS_PATH} activeClassName={styles.active}>Packs</NavLink>
                <NavLink to={LEARN} activeClassName={styles.active}>Learn</NavLink>
            </nav>
            {
                isAuth && <div className={styles.signOut}>
                    <Button title={'Sign Out'} onClick={signOut}/>
                </div>
            }
        </header>
    )
};