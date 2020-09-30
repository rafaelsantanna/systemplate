import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import './styles.scss';

export default function App() {
    return (
        <Routes />
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
