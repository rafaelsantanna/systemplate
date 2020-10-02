import React from 'react';

import './styles.scss';

export default function Signup() {
    return (
    <div className="container-signup">
        <div className="signup">
            <h3>Cadastro</h3>
            <form>
                <input className="text-input" type="text" placeholder="E-mail" />
                <input className="text-input" type="password" placeholder="Senha" />
                <input className="text-input" type="password" placeholder="Repetir a senha" />
                <input className="text-input" type="text" placeholder="Nome" />
                <input className="text-input" type="text" placeholder="Sua marca" />
                <input className="upload" type="file" placeholder="Logo" />
                <button>Cadastrar</button>
            </form>
        </div>
    </div>
    );
}