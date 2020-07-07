import React from 'react';
import styles from './Rows.module.scss';
import {Button} from '../../Button/Button';
import {PackItemType} from '../../../../../features/Packs/types';

type RowsPropsType = {
    rows: Array<PackItemType>
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
}

export const Rows: React.FC<RowsPropsType> = React.memo(({rows, deleteItem, updateItem}) => {
    return (
        <div className={styles.rows}>
            {
                rows.map( row => {
                    return <div key={row._id} className={styles.row}>
                        <span>{row.name}</span>
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