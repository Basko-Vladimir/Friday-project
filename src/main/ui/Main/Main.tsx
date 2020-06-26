import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Page1} from '../pages/Page1/Page-1';
import {Page2} from '../pages/Page2/Page2';
import {Page3} from '../pages/Page3/Page3';

export const Main = () => {
    return (
        <Switch>
            <Route path={'/page-1'} render={() => <Page1/>}/>
            <Route path={'/page-2'} render={() => <Page2/>}/>
            <Route path={'/page-3'} render={() => <Page3/>}/>
            <Redirect exact path={'/'} to={'/page-1'}/>
            <Route path={'*'} render={() => <div> 404 ERROR NOT FOUND</div>}/>
        </Switch>
    )
};