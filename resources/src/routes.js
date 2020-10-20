import React, { useEffect, useContext, useState } from 'react';
import { isAuthenticated } from './auth';
import { StoreContext } from './store';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Template from './pages/Template';
import TemplateList from './pages/TemplateList';
import TemplateDownload from './pages/TemplateDownload';

const PrivateRoute = ({ component: Component,admin, ...rest}) => {
    const [store, setStore] = useContext(StoreContext);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if(store.authenticatedUser) setRoles([store.authenticatedUser.roles]);
    }, []);

    if(admin) {
        if(!roles.includes('ADMIN'))
        return (
            <Route render={props => (
                <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
            )}
            />
        )
    }

    return (
        <Route
            {...rest}
            render={props =>
            isAuthenticated(Admin) ? (
                <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
                )}
        />
    )
}

export default function Routes() {
    const [store, setStore] = useContext(StoreContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(store.authenticated);
    }, [store.authenticated]);

    return (
        <BrowserRouter>
            {isAuthenticated  && (
                <Header />
            )}
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/template-download/:id" component={TemplateDownload} />
                <PrivateRoute path="/admin" component={Admin} admin />
                <PrivateRoute path="/template" component={Template} admin />
                <PrivateRoute path="/templatelist" component={TemplateList} />
            </Switch>
        </BrowserRouter>
    );
}