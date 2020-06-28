import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input} from '../../../main/UI/common/Input/Input';
import {Button} from '../../../main/UI/common/Button/Button';
import s from './SignUp.module.scss';
import {AppStateType} from "../../../main/BLL/store";
import {useDispatch, useSelector} from "react-redux";
import {isLoading, SignUpError, signUpTC} from "../BLL/SignUpReducer";
import Loading from "../../../main/UI/common/LoadingToggle/Loading";
import {SignUpPropsType} from "../BLL/SignUpTypes";
import {Redirect} from 'react-router-dom';
import {SIGN_IN_PATH} from "../../../main/UI/Routes/Routes";




export const SignUp: React.FC<SignUpPropsType> = ({login, firstPass,
                                                      secondPass,
                                                      setFirstPass, setLogin, setSecondPass,
                                                      registerMe, similar,
                                                      wrongPassword, responseMessage, isLoading}) => {
    const setEmailCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.currentTarget.value)
    };
    const setPassCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstPass(e.currentTarget.value)
    };
    const setConfirmPassCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setSecondPass(e.currentTarget.value)
    };
    return (
        <div className={s.container}>
            <h1>Sign Up</h1>

            <div className={s.inputs}>
                <Input placeholder={'Enter Your email'} changeInput={setEmailCallback}
                        type='text' value={login}
                />
                <Input placeholder={'Enter Your Password'} changeInput={setPassCallback}
                        type='password' value={firstPass}
                />
                <Input placeholder={'Confirm Your password'} changeInput={setConfirmPassCallback}
                        type='password' value={secondPass}
                /> {!similar && <span>password does not match!</span>}
            </div>

            <Button title={'Sign Up'} onClick={similar? registerMe : wrongPassword} />
            {isLoading && <Loading/>}
            {<span>{responseMessage}</span>}
        </div>
    )
};
export const SignUpContainer = () => {
    const dispatch = useDispatch();
    const {signUpSuccess, message} = useSelector((state: AppStateType) => state.signUp);
    const [login, setLogin] = useState('');
    const [similar, setSimilar] = useState<boolean>(false);
    const [firstPass, setFirstPass] = useState<string>('');
    const [secondPass, setSecondPass] = useState<string>('');
    useEffect(() => {
        if (secondPass === firstPass && secondPass) setSimilar(true);
        else setSimilar(false)
    }, [secondPass, firstPass]);
    const registerMe = () => {
        dispatch(signUpTC(login, firstPass))
    };
    const wrongPassword = () => {
        dispatch(SignUpError('wrong credentials'))
    };

    return(
        <>
            { !signUpSuccess ?
                <SignUp login={login} setLogin={setLogin}
                    firstPass={firstPass} setFirstPass={setFirstPass}
                    secondPass={secondPass} setSecondPass={setSecondPass}
                    similar={similar} registerMe={registerMe}
                    responseMessage={message} wrongPassword={wrongPassword}
                    isLoading={isLoading}
            />
            : <Redirect to={SIGN_IN_PATH}/>
            }
        </>
    )
};


