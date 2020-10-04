import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.scss';

export default function Signup({ history }) {
    const [form, setForm] = useState({});
    const [logoText, setLogoText] = useState('Sua Logo');

    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        Object.entries(form).map((item) => {
            formData.append(item[0], item[1]);
        });
        
        api.post('/auth/signup', formData, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(() => {
            setForm({});useEffect(() => {
                console.log(form);
            }, [form]);
        });
    }

    function handleLogoUpload(e) {
        let logo = e.target.files[0];

        setForm({...form, logo});
        setLogoText(e.target.files[0].name);
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
                <label className="logo-upload" htmlFor="logo-upload">
                    {logoText}
                    <input id="logo-upload" type="file" onChange={(e)=> handleLogoUpload(e)} />
                </label>
                <button>Cadastrar</button>
            </form>
        </div>
    </div>
    );
}