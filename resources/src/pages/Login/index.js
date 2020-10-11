import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.scss';

export default function Login({ history }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let tokenExists = localStorage.getItem('access_token');
        if(tokenExists) {
            history.push('/templatelist');
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        
        api.post('/auth/login', {email: user, password}, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((response) => {
            let token = response.data.access_token;
            let user = JSON.stringify(response.data.user);
            
            localStorage.setItem('access_token', token);
            localStorage.setItem('user', user);

            history.push('/templatelist');
        }).catch((res) => {
            alert('Usuário ou senha incorretos');
        });
    }

    return (
        <div className="container-login">
            <div className="login">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Usuário" onChange={(e) => setUser(e.target.value)}/>
                    <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                    <a href="" onClick={() => history.push('signup')}>Criar conta</a>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}