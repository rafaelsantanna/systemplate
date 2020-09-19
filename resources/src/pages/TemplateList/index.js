import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.scss';

import copyIcon from '../../assets/icons/copy-solid.svg';
import editIcon from '../../assets/icons/edit-solid.svg';
import trashIcon from '../../assets/icons/trash-solid.svg';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    const response = await api.get('/templates');
    setTemplates(response.data);
  }

  function handleCopyTemplate(e, id) {
    e.preventDefault();
  }
  async function handleDeleteTemplate(e, id) {
    e.preventDefault();
    await api.delete(`/templates/${id}`).then((response) => {
      console.log(response);
      setTemplates(templates.filter((template) => {
        return template.id !== id;
      }));
    });
  }
  function handleEditTemplate(e, id){
    e.preventDefault();
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-center mb-5">
        <h1>Lista de Templates</h1>
      </div>
      <div className="row">
        {templates.length > 0 && templates.map((template) => (
          <div className="col-3 mb-3" key={template.id}>
            <div className="template">
              <img className="template-image" src={template.image}></img>
              <div className="template-body">
                <h3 className="template-name">{template.name}</h3>
                <div className="template-footer">
                  <a href="" onClick={(e) => handleCopyTemplate(e, template.id)}>
                    <img src={copyIcon}></img>
                  </a>
                  <a href="" onClick={(e) => handleEditTemlplate(e, template.id)}>
                    <img src={editIcon}></img>
                  </a>
                  <a href="" onClick={(e) => handleDeleteTemplate(e, template.id)}>
                    <img src={trashIcon}></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}