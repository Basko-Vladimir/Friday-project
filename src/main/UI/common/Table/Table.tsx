import React from 'react';
import styles from './Table.module.scss';
import {PackItemType} from '../../../../features/Packs/types';
import {ColumnsHeaders} from './ColumnsHeaders/ColumnsHeaders';
import {Rows} from './Rows/Rows';

type TablePropsType = {
    columnsHeaders: Array<string>
    rows: Array<PackItemType>
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
    addItem: () => void
}

export const Table = React.memo(function (props:TablePropsType) {
    const {columnsHeaders, rows, deleteItem, addItem, updateItem} = props;

    return (
            <div className={styles.table}>
                <ColumnsHeaders columnsHeaders={columnsHeaders} addItem={addItem}/>
                <Rows rows={rows} deleteItem={deleteItem} updateItem={updateItem}/>
            </div>
        )
});
