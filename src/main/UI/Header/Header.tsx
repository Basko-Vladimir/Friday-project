import React from 'react';
import styles from './Header.module.css';

import {NavLink} from 'react-router-dom';

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navMenu}>
                <NavLink to={'/sign-in'} activeClassName={styles.active}>Sign In</NavLink>
                <NavLink to={'/sign-up'} activeClassName={styles.active}>Sign Up</NavLink>
                <NavLink to={'/forgot'} activeClassName={styles.active}>Forgot</NavLink>
                <NavLink to={'/set-new-password'} activeClassName={styles.active}>Set New Password</NavLink>
                <NavLink to={'/profile'} activeClassName={styles.active}>Profile</NavLink>
            </nav>
        </header>
    )
};