import React from 'react';
import s from './Learn.module.scss'
import {Button} from "../../main/UI/common/Button/Button";

const Learn = function () {


    return <div className={s.container}>
        <div className={s.visible}>
            <h2>Learning Page</h2>
            <p>Question</p>
            <Button title='check'/>
        </div>
        <div className={s.hidden}>
            <p>Answer</p>
            <div className={s.body}>
                <div className={s.answers}>
                    <span>Не знал.</span>
                    <span>Что-то слышал про это...</span>
                    <span>Угадал</span>
                    <span>Почти знал</span>
                    <span>Знал на 100%</span>
                </div>
                <div className={s.nextBtnContainer}>
                    <Button title='Next >>>'/>
                </div>

            </div>
        </div>
    </div>
};

export const LearnContainer = () => {

    return <Learn />
};