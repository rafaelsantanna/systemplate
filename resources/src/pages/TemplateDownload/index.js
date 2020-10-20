import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import domToImage from 'dom-to-image';
import 'file-saver';

import api from '../../services/api';

import './style.scss';

export default function TemplateDownload() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [template, setTemplate] = useState([]);

  const [cssTemplateImage, setCssTemplateImage] = useState({});
  const [cssCompany, setCssCompany] = useState({});
  const [cssLogo, setCssLogo] = useState({});
  const [cssPhone, setCssPhone] = useState({});
  
  useEffect(() => {
    api.get('templates/download/' + id).then((res) => {
      setUser(res.data.user);
      setTemplate(res.data.template);
    });
  }, []);

  useEffect(() => {
    if(template.length == 0) return;

    if(template.type === 'capa') setCssTemplateImage({width: '828px', height: '475px'});
    if(template.type === 'post') setCssTemplateImage({width: '800px', height: '800px'});

    let objCssCompany = JSON.parse(template.fields).company || {};
    let objCssLogo = JSON.parse(template.fields).logo || {};
    let objCssPhone = JSON.parse(template.fields).phone || {};

    setCssCompany(mountObjectStyle(objCssCompany));
    setCssLogo(mountObjectStyle(objCssLogo));
    setCssPhone(mountObjectStyle(objCssPhone));
  }, [template]);

  function mountObjectStyle(field) {
    let data = {
      left: field.left ? field.left + 'px' : undefined,
      top:  field.top ? field.top+'px' : undefined,
      width: field.width ? field.width+'px' : undefined,
      height: field.height ? field.height+'px' : undefined,
      fontSize: field.font_size ? field.font_size+'px' : undefined,
      transform: field.transform ? `rotate(${field.rotate}deg)` : undefined,
      fontFamily: field.font_family ? field.font_family : undefined,
      color: field.color ? '#'+field.color : undefined,
      textAlign: field.text_align ? field.text_align : undefined,
    }
    
    Object.keys(data).map((item) => {
      if (data[item] == undefined) delete data[item];
    });

    return data;
  }

  function downloadTemplate() {
    let downloadImage = document.querySelector('#download-content');
    domToImage.toBlob(downloadImage)
    .then((blob) => {
      window.saveAs(blob, template.name);
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
  }

  return (
    <>
      <div className="download-container">
        <button className="download-button" onClick={() => downloadTemplate()}>Download</button>
        <div id="download-content" className="download-content" style={cssTemplateImage}>
          <img src={`/uploads/${template.image}`} style={cssTemplateImage} />
          <div className="download-fields" style={cssCompany}>{user.company}</div>
          <div className="download-fields" style={cssPhone}>{user.phone}</div>
          <img className="download-fields" style={cssLogo} src={'/uploads/logo/' + user.logo} />
        </div>
      </div>
    </>
  )
}
