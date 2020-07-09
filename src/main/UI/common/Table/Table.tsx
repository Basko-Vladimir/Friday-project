import React from 'react';
import styles from './Table.module.scss';

import {Button} from '../Button/Button';
import {NavLink} from 'react-router-dom';
import {CARDS_PATH} from '../../Routes/Routes';
import {ColumnsHeaders} from './ColumnsHeaders/ColumnsHeaders';

type TablePropsType = {
    columnsHeaders: Array<string>
    rows: Array<any> //Array<PackItemType> | Array<CardItemType> не работает такая типизация !
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
    addItem: () => void
    getItems: (sortParams: string) => void
    tableModel: string
}

export const Table = React.memo(function (props:TablePropsType) {
    const {columnsHeaders, rows, deleteItem, addItem, updateItem, tableModel, getItems} = props;

    return (
            <div className={styles.table}>
                <ColumnsHeaders columnsHeaders={columnsHeaders} addItem={addItem} getItems={getItems}/>
                {
                    tableModel === 'packs'
                        ? <div className={styles.rows}>
                            {!rows.length && <span>Packs didn't create, yet</span>}
                            {
                                rows.map(row => {
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
                        : <div className={styles.rows}>
                            {!rows.length && <span>Cards didn't create, yet</span>}
                            {
                                rows.map(row => {
                                    return <div key={row._id} className={styles.row}>
                                        <span>{row.question}</span>
                                        <span>{row.answer}</span>
                                        <span>{row.grade}</span>
                                        <span className={styles.buttonColumn}>
                                           <Button title={'Update'} onClick={() => updateItem(row._id)}/>
                                           <Button title={'Delete'} onClick={() => deleteItem(row._id)}/>
                                       </span>
                                    </div>
                                })
                            }
                        </div>
                    }
            </div>
        )
});
