import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Template from './pages/Template';
import TemplateList from './pages/TemplateList';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/template" component={Template} />
            <Route path="/templatelist" component={TemplateList} />
        </BrowserRouter>
    );
}