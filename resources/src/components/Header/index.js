import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export default function Header() {
  const [name, setName] = useState('');

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));

    setName(user.name);
    console.log(user.name);
  }, []);

  return (
    <header className="header">
      <div className="welcome">
        <div>Bem vindo(a), <span>{name}</span></div>
        <small><a href="">Sair</a></small>
      </div>
      <nav className="navigation">
        <NavLink activeClassName="active" to="/template">Template</NavLink>
        <NavLink activeClassName="active" to="/templatelist">Lista de Templates</NavLink>
        <NavLink activeClassName="active" to="/admin">Admin</NavLink>
      </nav>
    </header>
  );
}