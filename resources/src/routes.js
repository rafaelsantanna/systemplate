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

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
            )}
    />
)

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
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/template" component={Template} />
                <PrivateRoute path="/templatelist" component={TemplateList} />
            </Switch>
        </BrowserRouter>
    );
}