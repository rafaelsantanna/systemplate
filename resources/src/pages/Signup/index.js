import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.scss';

export default function Signup({ history }) {
    const [form, setForm] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        
        api.post('/auth/signup', form, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(() => {
            setForm({});
            alert('Usuário cadastrado com sucesso!');

            setTimeout(() => {
                history.push('/');
            }, 2000);
        });
    }

    return (
    <div className="container-signup">
        <div className="signup">
            <h3>Cadastro</h3>
            <form onSubmit={handleSubmit}>
                <input className="text-input" onChange={(e) => setForm({...form, email: e.target.value})} value={form.email || ''} type="text" placeholder="E-mail" />
                <input className="text-input" onChange={(e) => setForm({...form, password: e.target.value})} value={form.password || ''} type="password" placeholder="Senha" />
                <input className="text-input" onChange={(e) => setForm({...form, password_confirmation: e.target.value})} value={form.password_confirmation || ''} type="password" placeholder="Repetir a senha" />
                <input className="text-input" onChange={(e) => setForm({...form, name: e.target.value})} value={form.name || ''} type="text" placeholder="Nome" />
                <input className="text-input" onChange={(e) => setForm({...form, company: e.target.value})} value={form.company || ''} type="text" placeholder="Sua marca" />
                <input className="text-input" onChange={(e) => setForm({...form, phone: e.target.value})} value={form.phone || ''} type="text" placeholder="Telefone" />
                <input className="upload" type="file" placeholder="Logo" />
                <button>Cadastrar</button>
            </form>
        </div>
    </div>
    );
}