import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import domtoimage from 'dom-to-image';
import 'file-saver';
import api from '../../services/api';

import './style.scss';

import copyIcon from '../../assets/icons/copy-solid.svg';
import editIcon from '../../assets/icons/edit-solid.svg';
import trashIcon from '../../assets/icons/trash-solid.svg';

export default function Templates({ history }) {
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState(0);
  
  const [templateImage, setTemplateImage] = useState('');
  const [cssTemplateImage, setCssTemplateImage] = useState({});
  const [user, setUser] = useState({
    company: 'Astolfo Burguers',
    logo: 'https://www.google.com/logos/google.jpg', 
    tel: '21 98083-1828'
  });
  const [cssCompany, setCssCompany] = useState({});
  const [cssLogo, setCssLogo] = useState({});
  const [cssTel, setCssTel] = useState({});
  
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

  function mountObjectStyle(field) {
    console.log(field);
    let data = {
      left: field.left ? field.left + 'px' : undefined,
      top:  field.top ? field.top+'px' : undefined,
      width: field.width ? field.width+'px' : undefined,
      height: field.height ? field.height+'px' : undefined,
      fontSize: field.font_size ? field.font_size+'px' : undefined,
      transform: field.transform ? `rotate(${field.rotate}deg)` : undefined,
      fontFamily: field.font_family ? field.font_family : undefined,
      color: field.color ? '#'+field.color : undefined,
      textAlign: field.textAlign ? field.text_align : undefined,
    }
    
    Object.keys(data).map((item) => {
      if (data[item] == undefined) delete data[item];
    });

    console.log(data);

    return data;
  }

  function generateImage(e, template) {
    e.preventDefault();

    if(template.type === 'capa') setCssTemplateImage({width: '828px', height: '475px'});
    if(template.type === 'post') setCssTemplateImage({width: '800px', height: '800px'});

    let objCssCompany = JSON.parse(template.fields).company || {};
    let objCssLogo = JSON.parse(template.fields).logo || {};
    let objCssTel = JSON.parse(template.fields).phone || {};

    setCssCompany(mountObjectStyle(objCssCompany));
    setCssLogo(mountObjectStyle(objCssLogo));
    setCssTel(mountObjectStyle(objCssTel));

    setTemplateImage(`uploads/${template.image}`);
    // domtoimage.toBlob(document.querySelector('#generate-image'))
    // .then((blob) => {
    //   window.saveAs(blob, 'nome-banner.png');
    // })
    // .catch((error) => {
    //   console.error('oops, something went wrong!', error);
    // });
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
                    <a href="">Visualizar Imagem</a>
                    <a href="" onClick={(e) => generateImage(e, template)}>Gerar Imagem</a>
                  </div>
                  <div className="template-footer">
                    <a href="" onClick={(e) => handleDuplicateTemplate(e, template.id)}>
                      <img src={copyIcon} title="Copiar Template"></img>
                    </a>
                    <a href="" onClick={(e) => handleEditTemplate(e, template.id)}>
                      <img src={editIcon} title="Editar Template"></img>
                    </a>
                    <a href="" onClick={(e) => handleShowModalDelete(e, template.id)}>
                      <img src={trashIcon} title="Deletar Template"></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div id="generate-image" className="generate-image" style={cssTemplateImage}>
        <img src={templateImage} style={cssTemplateImage} />
        <div style={cssCompany}>{user.company}</div>
        <div style={cssTel}>{user.tel}</div>
        <img style={cssLogo} src={user.logo} />
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