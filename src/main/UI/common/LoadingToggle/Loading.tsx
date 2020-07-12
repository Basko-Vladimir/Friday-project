import React, {useEffect, useState} from 'react';
import s from './Loading.module.scss'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/store";


const Loading = () => {
    let [points, setPoints] = useState<string>('.');
    let isLoading = useSelector((state: AppStateType) => state.signUp.isLoading);

    useEffect(( ) => {
        const id = setTimeout(() => {
            points.length < 5
                ? setPoints(points + '.')
                : setPoints('.')
        }, 1000);
        return ( ) => {
            clearTimeout(id)
        }
    }, [setPoints,  points]);

    // const loadingProgress = () => {
    //     setTimeout(() => {
    //         points.length < 5
    //             ? setPoints(points + '.')
    //             : setPoints('.')
    //     }, 1000);
    //     return points
    // };
    return (
        <div className={isLoading ? s.body : s.hide}>
            <span className={s.loadingProgress}>
                {/*{isLoading && 'Loading' + loadingProgress()}   // Здесь заменил loadingProgress() на points*/}
                {isLoading && 'Loading' + points}
            </span>
        </div>
    );
};

export default Loading;
