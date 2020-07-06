import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {SignInContainer} from '../../../features/Sign-In/UI/SignInContainer';
import {SignUpContainer} from '../../../features/Sign-Up/UI/SignUp';
import {SetNewPassContainer} from '../../../features/Set-New-Pass/UI/SetNewPassContainer';
import {Profile} from '../../../features/Profile/Profile';
import {ForgotContainer} from '../../../features/Forgot/UI/ForgotContainer';
import {Packs} from '../../../features/Packs/UI/Packs';

export const SIGN_IN_PATH = '/sign-in';
export const SIGN_UP_PATH = '/sign-up';
export const FORGOT_PATH = '/forgot';
export const SET_NEW_PASS_PATH = '/set-new-password';
export const PROFILE_PATH = '/profile';
export const PACKS_PATH = '/packs';

export const Routes = () => {
    return (
        <Switch>
            <Route path={SIGN_IN_PATH} render={() => <SignInContainer/>}/>
            <Route path={SIGN_UP_PATH} render={() => <SignUpContainer/>}/>
            <Route path={FORGOT_PATH} render={() => <ForgotContainer/>}/>
            <Route path={`${SET_NEW_PASS_PATH}/:resetToken?`} render={() => <SetNewPassContainer/>}/>
            <Route path={PROFILE_PATH} render={() => <Profile/>}/>
            <Route path={PACKS_PATH} render={() => <Packs/>}/>
            <Redirect exact path={'/'} to={SIGN_IN_PATH}/>
            <Route path={'*'} render={() => <h2> 404 ERROR PAGE NOT FOUND</h2>}/>
        </Switch>
    )
};