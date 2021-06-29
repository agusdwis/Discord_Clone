import React from 'react';
import { Provider } from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import store from "../stores";

import Home from "../pages/HomePage";
import Register from "../pages/RegisterPage"
import Login from "../pages/LoginPage";
import ExplorePage from "../pages/ExplorePage";
import Group from "../pages/GroupPage";
import NotFound from "../pages/NotFoundPage";

export default function MainRoutes () {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route exact path={'/register'} component={Register}/>
                    <Route exact path={'/login'} component={Login}/>
                    <Route exact path={'/guilds-discovery'} component={ExplorePage} />
                    <Route path={'/guilds-discovery/:category'} component={ExplorePage} />
                    <Route path={'/channel/:id'} component={Group} />
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}