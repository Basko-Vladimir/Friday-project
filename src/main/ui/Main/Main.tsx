import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export const Main = () => {
    return (
        <>
            <Switch>
                <Route path={'/counter'} render={() => <div>Page 1</div>}/>
                <Route path={'/settings'} render={() => <div>Page 2</div>}/>
                <Redirect exact path={'/'} to={'/counter'}/>
                <Route path={'*'} render={() => <div>ERROR NOT FOUND</div>}/>
            </Switch>
        </>
    )
};