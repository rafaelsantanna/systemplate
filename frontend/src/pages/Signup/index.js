import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '../../helpers/Alert';

import './styles.scss';

export default function Signup({ history }) {
    const [form, setForm] = useState({});
    const [templateCategories, setTemplateCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState([]);
    const [logoText, setLogoText] = useState('Sua Logo');
    const [isEditing, setIsEditing] = useState(false);
    const [hasUser, setHasUser] = useState(false);

    useEffect(() => {
        let user = history.location.state ? history.location.state.user : false;

        if(user) {
            setIsEditing(true);
            setForm({...user});
            setHasUser(true);
            setCategorySelected(JSON.parse(user.food_categories));
        }

        api.get('/template-categories').then((response) => {
            let categories = [];
            response.data.map((item) => {
                categories.push({value: item.id, label: item.name});
            });

            setTemplateCategories(categories);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        Object.entries(form).forEach((item) => {
            formData.append(item[0], item[1]);
        });
        formData.append('food_categories', JSON.stringify(categorySelected));

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
                    {hasUser && (
                        // Condição necessária para carregar as opções quando tem usuário, sem ela não está carregando
                        <Select 
                            className="mb-3" 
                            isMulti
                            placeholder="Selecione o tipo do seu negócio"
                            defaultValue={categorySelected}
                            onChange={setCategorySelected}
                            options={templateCategories} 
                        />
                    )}
                    {!hasUser && (
                        <Select 
                            className="mb-3" 
                            isMulti
                            placeholder="Selecione o tipo do seu negócio"
                            defaultValue={categorySelected}
                            onChange={setCategorySelected}
                            options={templateCategories} 
                        />
                    )}
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