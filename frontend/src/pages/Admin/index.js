import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '../../helpers/Alert';

import './styles.scss';

import whatsappIcon from '../../assets/icons/whatsapp.svg';
import editIcon from '../../assets/icons/edit-solid.svg';
import trashIcon from '../../assets/icons/trash-solid.svg';

export default function Admin({ history }) {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    
    const [showModalDelete, setShowModalDelete] = useState(false);

    useEffect(() => {
        getUsers();
        getTemplates();
    }, []);

    async function getTemplates() {
        const response = await api.get('/templates', {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
          }
        });
        setTemplates(response.data);
      }

    async function getUsers() {
        const response = await api.get('/users', {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
          }
        });

        setUsers(response.data);
    }

    function handleSentToWhats(e, id, phone) {
        e.preventDefault();
        if(selectedTemplate === 0)  {
            Alert(toast, 'Selecione um template');
            return;
        }

        let tel = `55${phone.replace(/\s/g, '').replace('-', '')}`;
        let message = `Olá! Segue o link do post da semana! É só clicar e baixar. ${process.env.REACT_APP_BASE_URL}/template-download/${selectedTemplate}_${id}`;
        window.open(`https://api.whatsapp.com/send?phone=${tel}&text=${message}`);
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
              'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(() => {
            setUsers(users.filter((user) => {
              return user.id !== userId;
            }));
            setShowModalDelete(false);
            Alert(toast, 'Usuário deletado com sucesso');
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
                <div className="col-4 mb-3">
                    <select className="custom-select" onChange={(e) => setSelectedTemplate(e.target.value)}>
                        <option value={0}>Selecione um template</option>
                        {templates.length > 0 && templates.map((template) => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                        ))}
                    </select>
                </div>
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
                                    <a href="" onClick={(e) => handleSentToWhats(e, user.id, user.phone)}>
                                        <img src={whatsappIcon} alt="Whatsapp Icon"></img>
                                    </a>
                                    <a href="" onClick={(e) => handleEditUser(e, user.id)}>
                                        <img src={editIcon} alt="Edit Icon"></img>
                                    </a>
                                    <a href="" onClick={(e) => handleShowModalDelete(e, user.id)}>
                                        <img src={trashIcon} alt="Delete Icon"></img>
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
        <ToastContainer />
        </>
    );
}