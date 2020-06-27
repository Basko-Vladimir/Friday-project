import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {SignIn} from '../../../features/Sign-In/SignIn';
import {SignUp} from '../../../features/Sign-Up/SignUp';
import {Forgot} from '../../../features/Forgot/Forgot';
import {SetNewPass} from '../../../features/Set-New-Pass/SetNewPass';
import {Profile} from '../../../features/Profile/Profile';


export const SIGN_IN_PATH = '/sign-in';
export const SIGN_UP_PATH = '/sign-up';
export const FORGOT_PATH = '/forgot';
export const SET_NEW_PASS_PATH = '/set-new-password';
export const PROFILE_PATH = '/profile';

export const Routes = () => {
    return (
        <Switch>
            <Route path={SIGN_IN_PATH} render={() => <SignIn/>}/>
            <Route path={SIGN_UP_PATH} render={() => <SignUp/>}/>
            <Route path={FORGOT_PATH} render={() => <Forgot/>}/>
            <Route path={SET_NEW_PASS_PATH} render={() => <SetNewPass/>}/>
            <Route path={PROFILE_PATH} render={() => <Profile/>}/>
            <Redirect exact path={'/'} to={SIGN_IN_PATH}/>
            <Route path={'*'} render={() => <h2> 404 ERROR PAGE NOT FOUND</h2>}/>
        </Switch>
    )
};