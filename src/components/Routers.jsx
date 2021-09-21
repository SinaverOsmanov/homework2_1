import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import { Main } from "./Main";
import { Login } from "./Login";
import { Users } from "./Users";
import { User } from "./User";
import { ErrorPage } from "./ErrorPage";

export default function Routers() {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/users/:id" component={User}/>
            <Route path="/users" component={Users}/>
            <Route path="/errorPage" component={ErrorPage} />
            <Redirect to="/errorPage" />
        </Switch>
    );
}
