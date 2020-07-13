import React, {useState} from 'react';
import styles from './ColumnsHeaders.module.scss';
import {Button} from '../../Button/Button';

type HeadersPropsType = {
    columnsHeaders: Array<string>
    getItems: (sortParams: string) => void
    showModal: (name: string) => void
};


export const ColumnsHeaders: React.FC<HeadersPropsType> = React.memo((props) => {
    const [sortInc, setSort] = useState<boolean>(false);
    let sortDirection = '';

    const {columnsHeaders, getItems, showModal} = props;

    const onSetSort = (e: React.MouseEvent) => {
        let property = e.currentTarget.textContent;
        sortDirection = sortInc ? '&uarr;' : ' &darr;';
        if (property) {
            property = property.replace(/[^\w]/g, '');
            const typeSort = +sortInc + property.toLowerCase();
            getItems(typeSort);
        }
        setSort(!sortInc);
        e.currentTarget.innerHTML = `${property}  ${sortDirection}`
    };

    return (
        <div className={styles.headers}>
            {columnsHeaders.map((header, i) => {
                    return i === columnsHeaders.length - 1
                        ? <Button key={header} title={header} name={'add'} onClick={(e) => showModal(e.currentTarget.name)}/>
                        : <span key={header}>
                            <b onClick={onSetSort}>{header}</b>
                    </span>
                }
            )}
        </div>
    )
});