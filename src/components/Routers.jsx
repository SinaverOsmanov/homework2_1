import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import { Main } from "./layouts/Main";
import { Login } from "./layouts/Login";
import { ErrorPage } from "./page/ErrorPage";
import { Users } from "./layouts/Users";
import { UserPage } from "./page/userPage/UserPage";
import EditUserPage from "./page/userPage/editUserPage";

export default function Routers() {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId/edit" component={EditUserPage} />
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/users" component={Users} />
            <Route path="/errorPage" component={ErrorPage} />
            <Redirect to="/errorPage" />
        </Switch>
    );
}
