import React from 'react';
import styles from './ColumnsHeaders.module.scss';
import {Button} from '../../Button/Button';

type HeadersPropsType = {
    columnsHeaders: Array<string>
    addItem: () => void
};

export const ColumnsHeaders: React.FC<HeadersPropsType> = React.memo(({columnsHeaders, addItem}) => {
    return (
        <div className={styles.headers}>
            {columnsHeaders.map((header, i) =>  {
                    return i === columnsHeaders.length - 1
                        ? <Button key={header} title={header} onClick={addItem} />
                        : <span key={header}>{header}</span>
                }
            )}
        </div>
    )
});