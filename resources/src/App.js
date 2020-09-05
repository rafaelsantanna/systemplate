import React from 'react';
import ReactDOM from 'react-dom';

import Login from '../src/pages/Login';

export default function App() {
    return (
        <Login />
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
