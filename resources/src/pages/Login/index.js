import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.scss';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        api.post('/auth/login', {email: user, password}, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((response) => {
            console.log(response);
        });
    }
    return (
        <div className="container-login">
            <div className="login">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Usuário" onChange={(e) => setUser(e.target.value)}/>
                    <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}