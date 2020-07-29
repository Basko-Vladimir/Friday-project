import React, {ChangeEvent} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Pagination} from "@material-ui/lab";


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
        pagesCount: number, page: number,
        handleChange: ((event: ChangeEvent<unknown>, page: number) => void) | undefined
    };

export default function PaginationRounded(props:PaginationPropsType) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination variant="outlined" shape="rounded" style={{display: 'flex', justifyContent: 'center'}}
                        count={props.pagesCount} page={props.page} onChange={props.handleChange}
            />
        </div>
    );
}