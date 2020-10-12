import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

export default function Signup({ history }) {
    const [form, setForm] = useState({});
    const [logoText, setLogoText] = useState('Sua Logo');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let user = history.location.state ? history.location.state.user : false;

        if(user) {
            setIsEditing(true);
            setForm({...user});
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        Object.entries(form).map((item) => {
            formData.append(item[0], item[1]);
        });

        if(isEditing) {
            formData.append('_method', 'PUT');
            api.post(`/users/${formData.id}`, formData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((response) => {
                toast.dark('Usuário atualizado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push('/admin');
            });
            
            return;
        }
        
        api.post('/auth/signup', formData, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(() => {
            setForm({});
            setLogoText('Sua Logo');
            toast.dark('Usuário criado com sucesso!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                history.push('/');
            }, 3000);
        });
    }

    function handleLogoUpload(e) {
        let logo = e.target.files[0];

        setForm({...form, logo});
        setLogoText(e.target.files[0].name);
    }

    return (
    <>
        <div className="container-signup">
            <div className="signup">
                <h3>{isEditing ? 'Atualizar Usuário' : 'Cadastro'}</h3>
                <form onSubmit={handleSubmit}>
                    <input className="text-input" onChange={(e) => setForm({...form, email: e.target.value})} value={form.email || ''} type="text" placeholder="E-mail" disabled={isEditing}/>
                    <input className="text-input" onChange={(e) => setForm({...form, password: e.target.value})} value={form.password || ''} type="password" placeholder="Senha" />
                    <input className="text-input" onChange={(e) => setForm({...form, password_confirmation: e.target.value})} value={form.password_confirmation || ''} type="password" placeholder="Repetir a senha" />
                    <input className="text-input" onChange={(e) => setForm({...form, name: e.target.value})} value={form.name || ''} type="text" placeholder="Nome" />
                    <input className="text-input" onChange={(e) => setForm({...form, company: e.target.value})} value={form.company || ''} type="text" placeholder="Sua marca" />
                    <input className="text-input" onChange={(e) => setForm({...form, phone: e.target.value})} value={form.phone || ''} type="text" placeholder="Telefone" />
                    <label className="logo-upload" htmlFor="logo-upload">
                        {logoText}
                        <input id="logo-upload" type="file" onChange={(e)=> handleLogoUpload(e)} />
                    </label>
                    <button className={isEditing ? 'btn--update' : ''}>{isEditing ? "Atualizar" : "Cadastrar"}</button>
                </form>
            </div>
        </div>
        <ToastContainer />
    </>
    );
}