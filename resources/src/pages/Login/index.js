import React from 'react';

import './styles.scss';

export default function Login() {
    return (
        <div className="container-login">
            <div className="login">
                <h3>Login</h3>
                <form action="">
                    <input type="text" placeholder="Usuário"/>
                    <input type="password" placeholder="Senha"/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}