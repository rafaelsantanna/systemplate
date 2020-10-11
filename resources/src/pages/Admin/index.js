import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../../services/api';

import './styles.scss';

import editIcon from '../../assets/icons/edit-solid.svg';
import trashIcon from '../../assets/icons/trash-solid.svg';

export default function Admin({ history }) {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    
    const [showModalDelete, setShowModalDelete] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('access_token');
    
        if(!token) {
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          history.replace('/');
          return;
        }

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

    function handleEditUser(e, id) {
        e.preventDefault();

        let user = users.filter((item) => {
            return item.id === id
        });
        
        history.push({
            pathname: '/signup',
            state: { user: user[0] }
        });
    }

    function handleDeleteUser() {
        api.delete(`/users/${userId}`, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(() => {
            setUsers(users.filter((user) => {
              return user.id !== userId;
            }));
            setShowModalDelete(false);
        });
    }

    function handleShowModalDelete(e, id) {
        e.preventDefault();
        setShowModalDelete(true);
        setUserId(id);
    }

    function handleCloseModalDelete() {
        setShowModalDelete(false);
        setUserId(0);
    }


    return (
        <>
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead className="thead-dark">
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
                                <td className="table-actions">
                                    <a href="" onClick={(e) => handleEditUser(e, user.id)}>
                                        <img src={editIcon} title="Editar Usuário"></img>
                                    </a>
                                    <a href="" onClick={(e) => handleShowModalDelete(e, user.id)}>
                                        <img src={trashIcon} title="Deletar Usuário"></img>
                                    </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Modal show={showModalDelete} onHide={handleCloseModalDelete} centered>
            <Modal.Header>
            <Modal.Title>Relamente deseja deletar o Usuário?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalDelete}>Fechar</Button>
            <Button variant="danger" onClick={() => handleDeleteUser()}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}