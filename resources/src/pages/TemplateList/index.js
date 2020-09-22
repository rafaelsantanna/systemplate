import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../../services/api';

import './style.scss';

import copyIcon from '../../assets/icons/copy-solid.svg';
import editIcon from '../../assets/icons/edit-solid.svg';
import trashIcon from '../../assets/icons/trash-solid.svg';

export default function Templates({ history }) {
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState(0);
  
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [showModalDelete, setShowModalDelete] = useState(false);
  
  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    const response = await api.get('/templates');
    setTemplates(response.data);
  }

  function handleDuplicateTemplate(e, id) {
    e.preventDefault();
    api.post(`/templates/duplicate/${id}`).then((response) => {
      setTemplates([...templates, response.data.template])
    });
  }

  function handleDeleteTemplate() {
    api.delete(`/templates/${templateId}`).then(() => {
      setTemplates(templates.filter((template) => {
        return template.id !== templateId;
      }));
      setShowModalDelete(false);
    });
  }

  function handleEditTemplate(e, id) {
    e.preventDefault();

    let template = templates.filter((template) => {
      return (template.id == id);
    });
    localStorage.setItem('template', JSON.stringify(template));

    history.push('/template');
  }

  function handleShowModalDelete(e, id) {
    e.preventDefault();
    setShowModalDelete(true);
    setTemplateId(id);
  }

  function handleCloseModalDelete() {
    setShowModalDelete(false);
    setTemplateId(0);
  }

  return (
    <>
      <div className="container my-3">
      <div className="row justify-content-center mb-5">
        <h1>Lista de Templates</h1>
      </div>
      <div className="row">
        {templates.length > 0 && templates.map((template) => (
          <div className="col-3 mb-4" key={template.id}>
            <div className="template">
              <img className="template-image" src={'uploads/' + template.image}></img>
              <div className="template-body">
                <span className="template-type">{template.type}</span>
                <h3 className="template-name">{template.name}</h3>
                <div className="template-generate">
                  <button>Gerar Image</button>
                </div>
                <div className="template-footer">
                  <a href="" onClick={(e) => handleDuplicateTemplate(e, template.id)}>
                    <img src={copyIcon}></img>
                  </a>
                  <a href="" onClick={(e) => handleEditTemplate(e, template.id)}>
                    <img src={editIcon}></img>
                  </a>
                  <a href="" onClick={(e) => handleShowModalDelete(e, template.id)}>
                    <img src={trashIcon}></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      <Modal show={showModalDelete} onHide={handleCloseModalDelete} centered>
        <Modal.Header>
          <Modal.Title>Relamente deseja deletar o template?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDelete}>Fechar</Button>
          <Button variant="danger" onClick={() => handleDeleteTemplate()}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}