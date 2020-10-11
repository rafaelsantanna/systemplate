import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import StoreContext from './store';

import './styles.scss';

export default function App() {
    return (
        <StoreContext>
            <Routes />
        </StoreContext>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
