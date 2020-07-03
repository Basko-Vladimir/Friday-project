import React from 'react';
import styles from './Header.module.css';

import {NavLink} from 'react-router-dom';
import {SIGN_IN_PATH, SIGN_UP_PATH, FORGOT_PATH, SET_NEW_PASS_PATH, PROFILE_PATH} from '../Routes/Routes';

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navMenu}>
                <NavLink to={SIGN_IN_PATH} activeClassName={styles.active}>Sign In</NavLink>
                <NavLink to={SIGN_UP_PATH} activeClassName={styles.active}>Sign Up</NavLink>
                <NavLink to={FORGOT_PATH} activeClassName={styles.active}>Forgot</NavLink>
                <NavLink to={SET_NEW_PASS_PATH} activeClassName={styles.active}>Set New Password</NavLink>
                <NavLink to={PROFILE_PATH} activeClassName={styles.active}>Profile</NavLink>
            </nav>
        </header>
    )
};