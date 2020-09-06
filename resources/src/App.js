import React from 'react';
import ReactDOM from 'react-dom';

import Templates from './pages/Templates';

export default function App() {
    return (
        <Templates />
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
