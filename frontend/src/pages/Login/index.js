import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { isAuthenticated } from '../../auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '../../helpers/Alert';

import { StoreContext } from '../../store';

import './styles.scss';

export default function Login({ history }) {
    const [store, setStore] = useContext(StoreContext);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isAuthenticated()) {
            setStore({...store, authenticated: true});
            history.push('/templatelist');
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        
        api.post('/auth/login', {email: user, password}, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((response) => {
            let jwt = response.data.access_token;
            let authenticatedUser = response.data.user;
            
            localStorage.setItem('jwt', jwt);
            localStorage.setItem('authenticated_user', JSON.stringify(authenticatedUser));
            localStorage.setItem('authenticated', true);

            setStore({...store, authenticated: true, authenticatedUser: authenticatedUser, jwt});

            history.push('/templatelist');
        }).catch((res) => {
            Alert(toast, 'Usuário ou senha incorretos');
        });
    }

    return (
        <>
        <div className="container-login">
            <div className="login">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" onChange={(e) => setUser(e.target.value)}/>
                    <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                    <a href="" onClick={() => history.push('signup')}>Criar conta</a>
                    <button>Login</button>
                </form>
            </div>
        </div>
        <ToastContainer />
        </>
    );
}