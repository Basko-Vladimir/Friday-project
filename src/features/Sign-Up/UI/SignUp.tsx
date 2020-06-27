import React, {ChangeEvent, useState} from 'react';
import {Input} from '../../../main/UI/common/Input/Input';
import {Button} from '../../../main/UI/common/Button/Button';
import s from './SignUp.module.scss';
import {AppStateType} from "../../../main/BLL/store";
import {useSelector} from "react-redux";
import {isLoading} from "../BLL/SignUpReducer";
import Loading from "../../../main/UI/common/LoadingToggle/Loading";

type SignUpPropsType = {
    setLogin: (value: string) => void,
}


export const SignUp: React.FC<SignUpPropsType> = ({setLogin}) => {
    const setEmailCallback = (e:ChangeEvent<HTMLInputElement>) => { setLogin(e.currentTarget.value) };
    const setPassCallback = (e:ChangeEvent<HTMLInputElement>) => { setLogin(e.currentTarget.value) };
    const setConfirmPassCallback = (e:ChangeEvent<HTMLInputElement>) => { setLogin(e.currentTarget.value) };
    return (
        <div className={s.container}>
            <h1>Sign Up</h1>

            <div className={s.inputs}>
                <Input placeholder={'Enter Your email'} changeInput={setEmailCallback}/>
                <Input placeholder={'Enter Your Password'} changeInput={setPassCallback}/>
                <Input placeholder={'Confirm Your password'} changeInput={setConfirmPassCallback}/>
            </div>

            <Button title={'Sign Up'}/>
            {isLoading && <Loading/>}
        </div>
    )
};
export const SignUpContainer = () => {

    const [login, setLogin] = useState<string>('');

    return <SignUp setLogin={setLogin} />
};


