import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {SignIn} from '../../../features/Sign-In/SignIn';
import {SignUp} from '../../../features/Sign-Up/SignUp';
import {Forgot} from '../../../features/Forgot/Forgot';
import {SetNewPass} from '../../../features/Set-New-Pass/SetNewPass';
import {Profile} from '../../../features/Profile/Profile';

export const Main = () => {
    return (
        <Switch>
            <Route path={'/sign-in'} render={() => <SignIn/>}/>
            <Route path={'/sign-up'} render={() => <SignUp/>}/>
            <Route path={'/forgot'} render={() => <Forgot/>}/>
            <Route path={'/set-new-password'} render={() => <SetNewPass/>}/>
            <Route path={'/profile'} render={() => <Profile/>}/>
            <Redirect exact path={'/'} to={'/sign-in'}/>
            <Route path={'*'} render={() => <h2> 404 ERROR PAGE NOT FOUND</h2>}/>
        </Switch>
    )
};