import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { StoreContext } from '../../store';

import './styles.scss';

export default function Header({history}) {
  const [store, setStore] = useContext(StoreContext);
  const [name, setName] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setName(user.name);
    }
  }, []);

  useEffect(() => {
    setLogged(store.logged);
  }, [store.logged]);

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setStore({...store, logged: false});
    window.location.reload(); // Tentar redirecionar com o componente de rotas
  }

  return (
    <>
    {logged && (
      <header className="header">
        <div className="welcome">
          <div>Bem vindo(a), <span>{name}</span></div>
          <small><a href="" onClick={(e) => logout(e)}>Sair</a></small>
        </div>
        <nav className="navigation">
          <NavLink activeClassName="active" to="/template">Template</NavLink>
          <NavLink activeClassName="active" to="/templatelist">Lista de Templates</NavLink>
          <NavLink activeClassName="active" to="/admin">Admin</NavLink>
        </nav>
      </header>
    )}
    </>
  );
}