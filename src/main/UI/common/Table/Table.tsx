import React from 'react';
import styles from './Table.module.scss';
import {Button} from '../Button/Button';
import {PackItemType} from '../../../../features/Packs/types';
import {useDispatch} from 'react-redux';
import {addPack, changePack, deletePack} from '../../../../features/Packs/BLL/packsReducer';
import {getItemFromLS} from '../../../../features/Sign-In/LS-service/localStorage';

type TablePropsType = {
    columnsHeaders: Array<string>
    rows: Array<PackItemType>
}


export const Table = React.memo(function (props:TablePropsType) {
    const {columnsHeaders, rows} = props;
    const dispatch = useDispatch();
    const token = getItemFromLS('token');

    const onUpdatePack = (idPack: string) => {
        dispatch(changePack(idPack, token));
    };

    const onAddPack = () => {
        dispatch(addPack(token))
    };

    const onDeletePack = (idPack: string) => {
        dispatch(deletePack(idPack, token))
    };


    return (
            <div className={styles.table}>
                <div className={styles.headers}>
                    {columnsHeaders.map((header, i) =>  {
                        return i === columnsHeaders.length - 1
                                ? <Button key={header} title={header} onClick={onAddPack} />
                                : <span key={header}>{header}</span>
                        }
                    )}
                </div>
                <div className={styles.rows}>
                    {
                        rows.map( row => {
                            return <div key={row._id} className={styles.row}>
                                       <span>{row.name}</span>
                                       <span>{row.grade ? row.grade : '---'}</span>
                                       <span className={styles.buttonColumn}>
                                           <Button title={'Update'} onClick={() => onUpdatePack(row._id)}/>
                                           <Button title={'Delete'} onClick={() => onDeletePack(row._id)}/>
                                       </span>
                                   </div>
                        })
                    }
                </div>
            </div>
        )
});
