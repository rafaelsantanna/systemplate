import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const response = await api.get('/users', {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
          }
        });

        setUsers(response.data);
      }


    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Empresa</th>
                                <th scope="col">Logo</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.company}</td>
                                <td>{user.logo}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <a>Editar</a>
                                    <a>Excluir</a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}