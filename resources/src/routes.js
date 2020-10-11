import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Template from './pages/Template';
import TemplateList from './pages/TemplateList';

export default function Routes() {
    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/admin" component={Admin} />
            <Route path="/template" component={Template} />
            <Route path="/templatelist" component={TemplateList} />
        </BrowserRouter>
    );
}