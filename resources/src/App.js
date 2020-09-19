import React from 'react';
import ReactDOM from 'react-dom';

import Template from './pages/Template';
import TemplateList from './pages/TemplateList';

export default function App() {
    return (
        // <Template />
        <TemplateList />
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
