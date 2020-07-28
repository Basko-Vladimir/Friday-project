import React, {ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useEffect} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Pagination} from "@material-ui/lab";
import {getItemFromLS} from "../../../../features/Sign-In/LS-service/localStorage";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";
import {getTotalCount} from "./BLL/paginatorReducer";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

export type PaginationPropsType = {
        currentPage: number, pagesCount: number, cardPacksTotalCount: number, pageSize: number, page: number,
        handleChange: ((event: ChangeEvent<unknown>, page: number) => void) | undefined
    };

export default function PaginationRounded(props:PaginationPropsType) {
    const classes = useStyles();
    // const [page, setPage] = React.useState(1);
    // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setPage(value);
    // };

    // Данные
    // const pageSize = useSelector<AppStateType, number>(s => s.packs.pageCount); // Кол-во элементов на странице(РАЗМЕР)
    //
    // const cardPacksTotalCount = useSelector<any, number>(s => s.paginator.cardPacksTotalCount);  //Кол-во колод
    // const pagesCount = Math.ceil(cardPacksTotalCount / pageSize); // Кол-во страниц
    // let currentPage = useSelector<AppStateType, number>(s => s.packs.page); // Текущая страница
    // const isToken = useSelector<AppStateType, boolean>(s => s.paginator.isToken);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if(isToken) {
    //         const token = getItemFromLS('token') as string;
    //         dispatch(getTotalCount(token));
    //     }
    // }, []);

    // Вызов санки, экшена

    // const setPage = () => {
    //     dispatch(SetNewPageAC(currentPage));
    //     const token = getItemFromLS('token') as string;
    //     dispatch(getPacksNew(token, currentPage))
    // };
    return (
        <div className={classes.root}>
            <Pagination variant="outlined" shape="rounded"
                        count={props.pagesCount} page={props.page} onChange={props.handleChange}
            />
        </div>
    );
}