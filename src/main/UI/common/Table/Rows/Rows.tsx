import React from 'react';
import styles from './Rows.module.scss';
import {Button} from '../../Button/Button';
import {NavLink} from 'react-router-dom';
import {CARDS_PATH} from '../../../Routes/Routes';

type RowsPropsType = {
    rows: Array<any> //Array<PackItemType> | Array<CardItemType> не работает такая типизация !
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
}

export const Rows: React.FC<RowsPropsType> = React.memo(({rows, deleteItem, updateItem}) => {
    return (
        <div className={styles.rows}>
            {
                rows.map( row => {
                    return <div key={row._id} className={styles.row}>
                        <span>
                            <NavLink to={`${CARDS_PATH}/${row._id}`}>{row.name}</NavLink>
                        </span>
                        <span>{row.grade}</span>
                        <span className={styles.buttonColumn}>
                                           <Button title={'Update'} onClick={() => updateItem(row._id)}/>
                                           <Button title={'Delete'} onClick={() => deleteItem(row._id)}/>
                                       </span>
                    </div>
                })
            }
        </div>
    )
});