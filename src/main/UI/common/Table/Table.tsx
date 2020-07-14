import React from 'react';
import styles from './Table.module.scss';
import {Button} from '../Button/Button';
import {NavLink} from 'react-router-dom';
import {CARDS_PATH, LEARN} from '../../Routes/Routes';
import {ColumnsHeaders} from './ColumnsHeaders/ColumnsHeaders';
import {CardItemType} from '../../../../features/Cards/types';
import {PackItemType} from '../../../../features/Packs/types';

type TablePropsType = {
    columnsHeaders: Array<string>
    rows: any
    getItems: (sortParams: string) => void
    tableModel: string
    showModal: (modalType: string, id?: string, creatorId?: string, name?: string, question?: string, answer?: string) => void
}
const btnStyle = {width: '80px'};
export const Table = React.memo(function (props: TablePropsType) {
    const {columnsHeaders, rows, tableModel, getItems, showModal} = props;

    return (
        <div className={styles.table}>
            <ColumnsHeaders columnsHeaders={columnsHeaders} getItems={getItems} showModal={showModal}/>
            {
                tableModel === 'packs'
                    ? <div className={styles.rows}>
                        {!rows.length && <span>Packs didn't create, yet</span>}
                        {
                            rows.map((row: PackItemType) => {
                                return <div key={row._id} className={styles.row}>
                                        <span>
                                            <NavLink to={{
                                                pathname: `${CARDS_PATH}/${row._id}`,
                                                state: {data: row.user_id}
                                            }}>{row.name}</NavLink>
                                        </span>
                                    <span>{row.grade}</span>
                                    <span className={styles.buttonColumn}>
                                           <Button style={btnStyle} title={'Change'} name={'change'}
                                                   onClick={(e) => showModal(e.currentTarget.name, row._id, row.user_id, row.name)}/>
                                           <Button style={btnStyle} title={'Delete'} name={'delete'}
                                                   onClick={(e) => showModal(e.currentTarget.name, row._id, row.user_id)}/>
                                           <NavLink to={`${LEARN}/${row._id}`}><Button style={btnStyle} title={'Learn'} name={'learn'} /></NavLink>
                                       </span>
                                </div>
                            })
                        }
                    </div>
                    : <div className={styles.rows}>
                        {!rows.length && <span>Cards didn't create, yet</span>}
                        {
                            rows
                                .map((row: CardItemType) => {
                                    return <div key={row._id} className={styles.row}>
                                        <span>{row.question}</span>
                                        <span>{row.answer}</span>
                                        <span>{row.grade}</span>
                                        <span className={styles.buttonColumn}>
                                           <Button title={'Change'} name={'change'}
                                                   onClick={(e) => showModal(e.currentTarget.name, row._id, row.user_id, row.question, row.answer)}/>
                                           <Button title={'Delete'} name={'delete'}
                                                   onClick={(e) => showModal(e.currentTarget.name, row._id, row.user_id)}/>
                                       </span>
                                    </div>
                                })
                        }
                    </div>
            }
        </div>
    )
});
