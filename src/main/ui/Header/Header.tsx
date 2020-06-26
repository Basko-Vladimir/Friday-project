import React from 'react';
import styles from './Header.module.css';

import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={styles.header}>
            <NavLink to={'/page-1'} activeClassName={styles.active}>Page-1</NavLink>
            <NavLink to={'/page-2'} activeClassName={styles.active}>Page-2</NavLink>
            <NavLink to={'/page-3'} activeClassName={styles.active}>Page-3</NavLink>
        </header>
    )
};