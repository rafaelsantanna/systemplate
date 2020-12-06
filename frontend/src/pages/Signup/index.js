import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '../../helpers/Alert';

import './styles.scss';

export default function Signup({ history }) {
    const [form, setForm] = useState({});
    const [templateCategories, setTemplateCategories] = useState([]);
    const [logoText, setLogoText] = useState('Sua Logo');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let user = history.location.state ? history.location.state.user : false;

        if(user) {
            setIsEditing(true);
            setForm({...user});
        }

        api.get('/template-categories').then((response) => {
            setTemplateCategories(response.data);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        Object.entries(form).forEach((item) => {
            formData.append(item[0], item[1]);
        });

        if(isEditing) {
            formData.append('_method', 'PUT');
            api.post(`/users/${formData.id}`, formData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((response) => {
                Alert(toast, 'Usuário atualizado com sucesso!');
                setTimeout(() => {
                    history.push('/admin');     
                }, 3000);
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
            Alert(toast, 'Usuário criado com sucesso!');
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
                    <select className="custom-select mb-3" onChange={ (e) => setForm({...form, template_category_id: e.target.value})} value={form.template_category_id || 0}>
                        <option value="0">Selecione o tipo do seu negócio</option>
                        {templateCategories.length > 0 && templateCategories.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
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